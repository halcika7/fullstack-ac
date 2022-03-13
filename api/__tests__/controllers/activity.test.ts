import { ActivityController } from '@controllers/activity.controller';
import { Request, Response } from 'express';

const controller = new ActivityController();

describe('Testing activity controller', () => {
  describe('Testing getActivities method', () => {
    it('should catch an error', async () => {
      const rsp = await controller.getActivities(
        {} as Request,
        {} as Response,
        err => err
      );

      expect((rsp as unknown as Error).message).toBeTruthy();
    });
  });
});
