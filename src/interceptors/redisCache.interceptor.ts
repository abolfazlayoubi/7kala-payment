import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from "@nestjs/common";
import { tap } from "rxjs/operators";
import { createClient } from "redis";
import { Observable } from "rxjs";
import { ENV_CONFIG, YesOrNo } from "../env-config";

@Injectable()
export class RedisCache implements NestInterceptor {
  private client;
  private ttl: number; // TTL in seconds
  constructor(ttl: number) {
    if (process.env.ONLY_LOGGER === YesOrNo.NO) {
      this.ttl = ttl;
      this.client = createClient({
        url: `redis://${ENV_CONFIG.cache.redis.host}:${ENV_CONFIG.cache.redis.port}`,
        database: ENV_CONFIG.cache.redis.database,
      });

      this.client.on("error", (err) => console.log("Redis Client Error", err));
      this.client.connect();
    }
  }

  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    const key = "cachedRequest:" + context.switchToHttp().getRequest().url;
    const value = await this.client.get(key);

    if (value) {
      return JSON.parse(value);
    }

    return next.handle().pipe(tap(async (data) => await this.client.set(key, JSON.stringify(data), { EX: this.ttl })));
  }
}
