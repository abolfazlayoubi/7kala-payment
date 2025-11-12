import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { env } from "../env";
import { AuthModule } from "./auth/auth.module";
import { PaymentModule } from "./payment/payment.module";
import { CartModule } from "./cart/cart.module";
@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    TypeOrmModule.forRoot({
      type: "mysql",
      host: env.database.host,
      port: +env.database.port,
      username: env.database.username,
      multipleStatements: true,
      password: env.database.password,
      database: env.database.name,
      entities: ["dist/**/*.entity{.ts,.js}"],
      migrations: ["dist/migrations/*{.ts,.js}"],
      synchronize: env.nodeEnv !== "production",
    }),
    AuthModule,
    PaymentModule,
    CartModule,
  ],
})
export class AppModule {}
