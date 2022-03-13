import { ErrorRequestHandler } from 'express';
import { logger } from '@utils/logger.util';
import { HttpException, InternalServerError } from '@exceptions';
import { HttpStatusCode } from '@enums/http-status.enum';

export const errorHandle: ErrorRequestHandler = (error, _, res, __) => {
  if (error instanceof HttpException) {
    const { status, meta, ...rest } = error.getResponse();
    logger.error('HttpException error', { status, meta, ...rest });
    return res.status(status).json({ ...rest, ...meta });
  }

  if (error instanceof SyntaxError && 'body' in error) {
    return res
      .status(HttpStatusCode.BAD_REQUEST)
      .json({ message: 'Malformed request body' });
  }

  logger.error('Unhandled error', error);

  const serverError = new InternalServerError();
  const { status, meta, ...rest } = serverError.getResponse();

  return res.status(status).json({ ...rest, ...meta });
};
