import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { WsAdapter } from '@nestjs/platform-ws';

async function start() {
  const app = await NestFactory.create(AppModule);
  app.useWebSocketAdapter(new WsAdapter(app));
  const PORT = 3000;
  await app.listen(PORT);
  // console.log('process.env.IS_TS_NODE:', process.env.IS_TS_NODE);
  console.log(`Start server on PORT ${PORT}`);
}
start();
