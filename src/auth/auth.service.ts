import { Injectable, NotFoundException } from "@nestjs/common";
import { AuthResponse, CustomerUserRole, RegisterDto, TokenUserSchema } from "../dto/auth.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CustomerContextEntity } from "../entities/customerContext.entity";
import { JwtService } from "@nestjs/jwt";
import { CustomerAddressContextEntity } from "../entities/customerAddressContext.entity";
import { jwtConstants } from "./auth.constants";
import { ENV_CONFIG } from "../env-config";
import { PinoLogger } from "nestjs-pino";
import { context, trace } from "@opentelemetry/api";
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(CustomerContextEntity)
    private readonly repo: Repository<CustomerContextEntity>,
    @InjectRepository(CustomerAddressContextEntity)
    private readonly repoAddress: Repository<CustomerAddressContextEntity>,
    private jwtService: JwtService,
    private readonly logger: PinoLogger,
  ) {}

  async ipCheck(ip: string): Promise<boolean> {
    ip = ip.split(",")[0].trim().replace("::ffff:", "");
    let ipWhiteList = new RegExp(ENV_CONFIG.auth.otp.whitelist);

    if (!ipWhiteList.test("disable") && !ipWhiteList.test(ip)) {
      this.logger.info({
        message: "IP not in whitelist",
        ip: ip,
        traceId: trace.getSpan(context.active())?.spanContext().traceId,
      });
      this.logger.error({
        message: "IP not in whitelist",
        ip: ip,
        traceId: trace.getSpan(context.active())?.spanContext().traceId,
      });
      return false;
    }

    return true;
  }
}
