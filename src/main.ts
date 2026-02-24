import "./telemetry";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { addTransactionalDataSource, initializeTransactionalContext } from "typeorm-transactional";
import { DataSource } from "typeorm";
import { ENV_CONFIG } from "./env-config";
import { LogLevel } from "@nestjs/common";
import { NestExpressApplication } from "@nestjs/platform-express";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { join } from "path";

async function bootstrap() {
  let loggerVals: LogLevel[] = [];
  if (ENV_CONFIG.nodeEnv === "development") {
    loggerVals = ["log", "error", "verbose", "warn", "debug"];
  } else {
    loggerVals = ["log", "error", "verbose", "warn"];
  }
  initializeTransactionalContext();
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: loggerVals,
  });
  const dataSource = app.get(DataSource);
  addTransactionalDataSource(dataSource);

  const config = new DocumentBuilder().setTitle("Payment Service").setDescription("Crawler Description").setVersion("1.0").build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);
  app.setBaseViewsDir(join(__dirname, "..", "src"));
  app.setViewEngine("ejs");

  app.enableCors({
    origin: "*",
  });
  await app.listen(process.env.PORT ?? 3011);
}
// eslint-disable-next-line no-console
bootstrap().catch((e) => console.error(e));
