import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api')
  await app.listen(8080).then(() => {
    console.log('App is listening on port 8080');
  });
}
bootstrap();
