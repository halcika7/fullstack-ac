import { Dictionary } from '@interfaces/common.interface';
import { errorHandle } from '@middlewares/error.middleware';
import { Request, Response } from 'express';

describe('Testing middleware', () => {
  it('Testing error handle middleware ===> Internal Server Error', () => {
    const rsp = errorHandle(
      {},
      {} as Request,
      {
        statusCode: 200,
        status: function fn(code: number) {
          (this! as Response).statusCode = code;
          return this;
        },
        json: function fn(data: unknown) {
          return data;
        },
      } as unknown as Response,
      jest.fn()
    );

    expect((rsp as unknown as Dictionary).message).toEqual(
      'Internal Server Error'
    );
  });
});
