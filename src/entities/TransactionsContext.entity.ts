import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Index } from "typeorm";

export enum CartStatus {
  PENDING_PAYMENT = "pendingPayment",
  IN_GATEWAY = "inGateway",
  PAID = "paid",
  FAILED = "failed",
  REFUNDED = "refunded",
  ORDER_PLACED = "orderPlace",
}

@Entity("transactions_context")
export class TransactionsContextEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "int",
  })
  cartId: number;

  @Column({ type: "bigint", default: 0 })
  amount: number;

  @Column({ type: "bigint", default: 0 })
  total: number;

  @Column({
    type: "varchar",
  })
  @Index({
    unique: true,
  })
  uuid: string;

  @Column({
    type: "enum",
    enum: CartStatus,
  })
  status: CartStatus;

  @Column({
    type: "varchar",
  })
  customerName: string;

  // @ManyToOne(() => CustomerContextEntity, (product) => product.id, { onDelete: "RESTRICT", onUpdate: "RESTRICT" })
  // @JoinColumn({
  //   name: "customerId",
  // })
  // customer: CustomerContextEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
