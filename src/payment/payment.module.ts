import { Module } from "@nestjs/common";
import { PaymentController } from "./payment.controller";
import { PaymentService } from "./payment.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TransactionsContextEntity } from "../entities/TransactionsContext.entity";
import { WalletTransactionsEntity } from "../entities/walletTransactions.entity";

@Module({
  controllers: [PaymentController],
  providers: [PaymentService],
  imports: [TypeOrmModule.forFeature([TransactionsContextEntity, WalletTransactionsEntity])],
})
export class PaymentModule {}
