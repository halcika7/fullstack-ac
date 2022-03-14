import express, { json, urlencoded, Application } from 'express';

import cors from 'cors';
import hpp from 'hpp';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { errorHandle } from './middlewares/error.middleware';
import morganMiddleware from './middlewares/morgan.middleware';

import { connectDb } from './database';
import { seedDb } from './database/seeder';

import { apiRoutes } from './routes';

import { logger } from './utils/logger.util';
import { env } from './utils/env.util';

export class App {
  private readonly _app: Application;

  private readonly port = env.PORT;

  constructor(private readonly mongo_uri: string) {
    this._app = express();
    this.initializeMiddleware();
  }

  async listen() {
    await connectDb(this.mongo_uri);

    await seedDb();

    this.initializeRoutes();

    return this._app.listen(this.port, () =>
      logger.info(`Ant Colony API listening on port ${this.port}!`)
    );
  }

  private initializeMiddleware() {
    this._app.use([
      json({ limit: '256mb' }),
      urlencoded({ extended: true, limit: '256mb' }),
      cookieParser(),
      helmet(),
      hpp(),
      cors({ origin: env.origin, credentials: true }),
      morganMiddleware,
    ]);
  }

  private initializeRoutes() {
    apiRoutes(this._app);
    this._app.use(errorHandle);
  }
}
