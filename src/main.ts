import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { addTransactionalDataSource, initializeTransactionalContext } from "typeorm-transactional";
import { DataSource } from "typeorm";

async function bootstrap() {
  initializeTransactionalContext();
  const app = await NestFactory.create(AppModule);
  const dataSource = app.get(DataSource);
  addTransactionalDataSource(dataSource);
  await app.listen(process.env.PORT ?? 3011);
}
// eslint-disable-next-line no-console
bootstrap().catch((e) => console.error(e));
