import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";
import { CustomerUserRole } from "../dto/auth.dto";

@Entity("customer_context")
export class CustomerContextEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "varchar",
  })
  @Index({
    unique: true,
  })
  email: string;

  @Column({
    type: "varchar",
    nullable: true,
  })
  firstName: string;

  @Column({
    type: "varchar",
    nullable: true,
  })
  lastName: string;

  @Column({
    type: "bigint",
    unsigned: true,
    nullable: true,
  })
  @Index({
    unique: true,
  })
  mobile: number;

  @Column({
    type: "varchar",
  })
  password: string;

  @Column({
    type: "enum",
    enum: CustomerUserRole,
    default: CustomerUserRole.CUSTOMER,
  })
  role: CustomerUserRole;
}
