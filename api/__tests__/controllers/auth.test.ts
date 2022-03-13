import { AuthController } from '@controllers/auth.controller';
import { Request, Response } from 'express';

const controller = new AuthController();

describe('Testing auth controller', () => {
  describe('Testing register method', () => {
    it('should catch an error', async () => {
      const rsp = await controller.register(
        {} as Request,
        {} as Response,
        err => err
      );

      expect((rsp as unknown as Error).message).toBeTruthy();
    });
  });
});
