import { ProgramController } from '@controllers/program.controller';
import { Request, Response } from 'express';

const controller = new ProgramController();

describe('Testing program controller', () => {
  describe('Testing createProgram method', () => {
    it('should catch an error', async () => {
      const rsp = await controller.createProgram(
        {} as Request,
        {} as Response,
        err => err
      );

      expect((rsp as unknown as Error).message).toBeTruthy();
    });
  });
});
