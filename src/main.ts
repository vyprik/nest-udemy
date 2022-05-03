import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function start() {
  const app = await NestFactory.create(AppModule);
  const PORT = 3000;
  await app.listen(PORT);
  // console.log('process.env.IS_TS_NODE:', process.env.IS_TS_NODE);
  console.log(`Start server on PORT ${PORT}`);
}
start();
