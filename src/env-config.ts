import * as dotenv from "dotenv";
import { join } from "path";

// Load environment variables from .env file
dotenv.config({ path: join(__dirname, "/../.env") });
export enum YesOrNo {
  YES = "yes",
  NO = "no",
}

export enum EnvType {
  DEV = "development",
  PRO = "production",
}
export const ENV_CONFIG = {
  nodeEnv: process.env.NODE_ENV || EnvType.PRO,
  serviceName: process.env.SERVICE_NAME || "payment",
  auth: {
    serviceName: process.env.AUTH_SERVICE_NAME || "auth",
    otp: {
      whitelist: process.env.OTP_WHITE_LIST || "127.0.0.1,localhost",
    },
  },
  logger: {
    exporter: {
      otlp: {
        host: process.env.OTEL_EXPORTER_OTLP_ENDPOINT || "http://192.168.1.7:4318",
        protocol: process.env.OTEL_EXPORTER_PROTOTYPE || "http/protobuf",
      },
    },
  },
  cache: {
    redis: {
      host: process.env.REDIS_CACHE_HOST || "localhost",
      port: +(process.env.REDIS_CACHE_PORT ?? 6379) || 6379,
      password: process.env.REDIS_CACHE_PASSWORD || "",
      database: parseInt(process.env.REDIS_CACHE_REDIS_DATABASE as string) || 13,
    },
  },
};
