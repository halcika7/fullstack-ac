import { ProfileController } from '@controllers/profile.controller';
import { Request, Response } from 'express';

const controller = new ProfileController();

describe('Testing profile controller', () => {
  describe('Testing updateProfile method', () => {
    it('should catch an error', async () => {
      const rsp = await controller.updateProfile(
        {} as Request,
        {} as Response,
        err => err
      );

      expect((rsp as unknown as Error).message).toBeTruthy();
    });
  });
});
