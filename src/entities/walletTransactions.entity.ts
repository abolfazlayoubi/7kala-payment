import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { TransactionsContextEntity } from "./TransactionsContext.entity";

@Entity("wallet_transactions")
export class WalletTransactionsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "varchar",
  })
  customerName: string;

  // @ManyToOne(() => CustomerContextEntity, (product) => product.id, { onDelete: "RESTRICT", onUpdate: "RESTRICT" })
  // @JoinColumn({
  //   name: "customerId",
  // })
  // customer: CustomerContextEntity;

  @Column({
    type: "int",
  })
  amount: number;

  @Column({
    type: "varchar",
  })
  description: string;

  @Column({
    type: "int",
    nullable: true,
  })
  transactionId: number;

  @ManyToOne(() => TransactionsContextEntity, (product) => product.id, { onDelete: "SET NULL", onUpdate: "RESTRICT" })
  @JoinColumn({
    name: "transactionId",
  })
  transaction: TransactionsContextEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
