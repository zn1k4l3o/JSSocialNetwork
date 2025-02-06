import { NestFactory } from '@nestjs/core';
import {
  ExpressAdapter,
  NestExpressApplication,
} from '@nestjs/platform-express';
import { AppModule } from './app.module';
import * as express from 'express';
import * as path from 'path';

async function bootstrap() {
  const server = express();
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    new ExpressAdapter(server),
  );

  // Serve static files from Angular's browser build
  server.use(express.static(path.join(__dirname, '..', 'browser')));

  // Dynamically import Angular Universal server bundle (ES Module)
  const { AppServerModuleNgFactory, ngExpressEngine } = await import(
    '../public/server/main.server.mjs'
  );

  // Set up Angular Universal engine
  app.engine(
    'html',
    ngExpressEngine({
      bootstrap: AppServerModuleNgFactory,
    }),
  );
  app.set('view engine', 'html');
  app.set('views', path.join(__dirname, '..', 'browser'));

  // Handle all routes with Angular Universal
  server.get('*', (req, res) => {
    res.render('index', { req });
  });

  await app.listen(3000);
}
bootstrap();
