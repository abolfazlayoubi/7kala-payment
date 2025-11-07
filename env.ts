import * as dotenv from "dotenv";
import { join } from "path";
import process from "node:process";

// Load environment variables from .env file
dotenv.config({ path: join(__dirname, ".env") });
export const env = {
  nodeEnv: process.env.PAYMENT_NODE_ENV || "development",
  kafka: {
    hosts: (process.env.KAFKA_HOST ?? "127.0.0.1:9092").split(","),
  },
  database: {
    host: process.env.PAYMENT_DATABASE_HOST || "localhost",
    port: +(process.env.PAYMENT_DATABASE_PORT ?? 3312) || 3308,
    username: process.env.PAYMENT_DATABASE_USERNAME || "root",
    password: process.env.PAYMENT_DATABASE_PASSWORD || "1",
    name: process.env.PAYMENT_DATABASE_NAME || "payment",
  },
};
