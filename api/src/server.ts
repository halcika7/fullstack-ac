import 'reflect-metadata';
import 'dotenv/config';
import { env } from '@utils/env.util';
import { App } from './app';
import { logger } from './utils/logger.util';

const { db } = env;

const main = async () => {
  const app = new App(`mongodb://${db.host}:${db.port}/${db.name}`);

  try {
    const server = await app.listen();

    process.on('SIGTERM', () => {
      logger.debug('SIGTERM signal received: closing HTTP server');
      server.close(() => {
        logger.debug('HTTP server closed');
      });
    });
  } catch (error) {
    logger.error('🚀 ~ file: server.ts ~ line 19 ~ main ~ error', error);
  }
};

main();
