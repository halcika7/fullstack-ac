import { NextFunction, Request, Response } from 'express';
import { UserI } from './user.interface';

export interface RequestWithUser extends Request {
  user?: Omit<UserI, 'password'>;
}

export interface RequestHandlerAuth {
  (req: RequestWithUser, res: Response, next: NextFunction): void;
}
