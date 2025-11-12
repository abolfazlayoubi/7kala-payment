import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { InsertResult, Repository } from "typeorm";
import { Transactional } from "typeorm-transactional";
import { CartStatus, TransactionsContextEntity } from "src/entities/TransactionsContext.entity";
import { WalletTransactionsEntity } from "../entities/walletTransactions.entity";

@Injectable()
export class PaymentService {
  protected logger = new Logger(PaymentService.name);
  constructor(
    @InjectRepository(TransactionsContextEntity)
    private readonly repo: Repository<TransactionsContextEntity>,
    @InjectRepository(WalletTransactionsEntity)
    private readonly repoWallet: Repository<WalletTransactionsEntity>,
  ) {}

  async setPayment(
    data: { id: number; amount: string; total: string; uuid: string; status: string; createdAt: string; updatedAt: string; customerName: string }[],
  ) {
    this.logger.log(data);
    const newCart = new TransactionsContextEntity();
    newCart.cartId = data[0].id;
    newCart.amount = +data[0].amount;
    newCart.total = +data[0].total;
    newCart.uuid = data[0].uuid;
    newCart.status = CartStatus.IN_GATEWAY;
    newCart.customerName = data[0].customerName;
    return await this.repo.save(newCart);
  }

  setFailed(id: number) {
    return this.repo.update(id, {
      status: CartStatus.FAILED,
    });
  }
  @Transactional()
  async setPaid(id: number) {
    return await this.repo.query<InsertResult>(`
   insert into wallet_transactions(customerName, amount, description,transactionId)
      select customerName,amount,concat('PAID CART:',cartId) as description,${id}
      from transactions_context
      where id=${id} and status='inGateway';
          
      update transactions_context
      set status='paid'
      where id=${id};`);
  }
}
