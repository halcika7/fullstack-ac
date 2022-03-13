import { HttpStatusCode } from '@enums/http-status.enum';
import { Dictionary } from '@interfaces/common.interface';
import { HttpException } from './http.exception';

export class Unauthorized extends HttpException {
  constructor(objectOrError?: Dictionary) {
    super(HttpException.createBody(objectOrError), HttpStatusCode.UNAUTHORIZED);
  }
}
