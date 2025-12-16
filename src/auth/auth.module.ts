import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CustomerContextEntity } from "../entities/customerContext.entity";
import { JwtModule } from "@nestjs/jwt";
import { CustomerAddressContextEntity } from "../entities/customerAddressContext.entity";
import { jwtConstants } from "./auth.constants";

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    TypeOrmModule.forFeature([CustomerContextEntity, CustomerAddressContextEntity]),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: {},
    }),
  ],
  exports: [AuthService],
})
export class AuthModule {}
