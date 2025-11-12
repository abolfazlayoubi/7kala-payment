import { Module } from "@nestjs/common";
import { CartService } from "./cart.service";
import { CartEventService } from "./cart-event.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { WalletTransactionsEntity } from "../entities/walletTransactions.entity";

@Module({
  providers: [CartService, CartEventService],
  imports: [TypeOrmModule.forFeature([WalletTransactionsEntity])],
})
export class CartModule {}
