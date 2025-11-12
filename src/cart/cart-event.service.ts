import { Injectable, Logger, OnModuleInit } from "@nestjs/common";
import { EachMessagePayload, Kafka } from "kafkajs";
import { env } from "../../env";
import { CartServiceC2OrderContext, OrderStatus, TopicContextList } from "../dto/context.dto";
import { KafkaMessageDto } from "../dto/kafka.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { WalletTransactionsEntity } from "../entities/walletTransactions.entity";
import { runInTransaction } from "typeorm-transactional";

@Injectable()
export class CartEventService implements OnModuleInit {
  protected logger = new Logger(CartEventService.name);
  private kafka = new Kafka({
    brokers: env.kafka.hosts,
  });
  private consumer = this.kafka.consumer({ groupId: "payment-cart-event-process" });
  private producer = this.kafka.producer();

  constructor(
    @InjectRepository(WalletTransactionsEntity)
    private readonly repo: Repository<WalletTransactionsEntity>,
  ) {}

  async onModuleInit() {
    await this.consumer.connect();
    await this.consumer.subscribe({ topics: [TopicContextList.CHECKOUT], fromBeginning: true });
    await this.consumer.run({
      autoCommit: false,
      eachMessage: async ({ topic, partition, message }: EachMessagePayload) => {
        try {
          const topicName = topic as unknown as TopicContextList;
          const raw = (message.value as unknown as string) || "{}";
          const payload = JSON.parse(raw) as unknown as KafkaMessageDto<CartServiceC2OrderContext>;
          if (payload.table === "cart_to_order_context" && topicName === TopicContextList.CHECKOUT) {
            if (payload.old?.status !== payload.data.status && [OrderStatus.REFUNDED, OrderStatus.PROCESSING].includes(payload.data.status)) {
              await runInTransaction(async () => {
                const a = `insert into wallet_transactions(customerName, amount, description,transactionId)
                    select customerName,if(${payload.data.status === OrderStatus.REFUNDED},amount,amount*-1),
                           concat('${payload.data.status === OrderStatus.REFUNDED ? "refunded:" : "orderPlace:"}',cartId) as description,
                           id
                    from transactions_context
                    where cartId=${payload.data.cartId} and status='${payload.data.status === OrderStatus.REFUNDED ? "orderPlace" : "paid"}';
                    
                    update transactions_context
                    set status='${payload.data.status === OrderStatus.REFUNDED ? "refunded" : "orderPlace"}'
                    where cartId=${payload.data.cartId} and status='${payload.data.status === OrderStatus.REFUNDED ? "orderPlace" : "paid"}'`;
                this.logger.debug(a);
                await this.repo.query(a);
              });
            }
          }
          await this.consumer.commitOffsets([{ topic, partition, offset: (Number(message.offset) + 1).toString() }]);
        } catch (e) {
          setTimeout(() => {
            this.consumer.seek({
              topic: topic,
              partition: partition,
              offset: message.offset,
            });
          }, 1000);

          this.logger.error(e);
        }
      },
    });
  }
}
