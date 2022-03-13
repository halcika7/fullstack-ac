import { logger } from '@utils/logger.util';
import { connect } from 'mongoose';

export const connectDb = async (uri: string) => {
  try {
    await connect(uri, { autoIndex: true });
  } catch (error) {
    logger.error('Failed to connect to the mongo database');
  }
};
