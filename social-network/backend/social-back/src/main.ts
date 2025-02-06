import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  //app.enableCors();

  app.setGlobalPrefix('api');

  app.useStaticAssets(join(__dirname, '..', 'public', 'browser'));

  app.use((req, res, next) => {
    if (req.originalUrl.startsWith('/api')) {
      return next();
    }
    res.sendFile(join(__dirname, '..', 'public', 'browser', 'index.html'));
  });

  const PORT = process.env.PORT || 3000;
  await app.listen(PORT);
}
bootstrap();
