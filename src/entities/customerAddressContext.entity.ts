import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { CustomerContextEntity } from "./customerContext.entity";

@Entity("customer_address_context")
export class CustomerAddressContextEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "varchar",
  })
  province: string;

  @Column({
    type: "varchar",
  })
  city: string;

  @Column({
    type: "tinytext",
  })
  address: string;

  @Column("decimal", { precision: 10, scale: 6 })
  latitude: number;

  @Column("decimal", { precision: 10, scale: 6 })
  longitude: number;

  @Column({
    type: "int",
  })
  customerId: number;

  @ManyToOne(() => CustomerContextEntity, (product) => product.id, { onDelete: "CASCADE", onUpdate: "RESTRICT" })
  @JoinColumn({
    name: "customerId",
  })
  customer: CustomerContextEntity;
}
