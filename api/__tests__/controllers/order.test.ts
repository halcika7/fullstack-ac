import { OrderController } from '@controllers/order.controller';
import { Request, Response } from 'express';

const controller = new OrderController();

describe('Testing order controller', () => {
  describe('Testing getOrders method', () => {
    it('should catch an error', async () => {
      const rsp = await controller.getOrders(
        {} as Request,
        {} as Response,
        err => err
      );

      expect((rsp as unknown as Error).message).toBeTruthy();
    });
  });

  describe('Testing getNumberOfOrdersByMonth method', () => {
    it('should catch an error', async () => {
      const rsp = await controller.getNumberOfOrdersByMonth(
        {} as Request,
        {} as Response,
        err => err
      );

      expect((rsp as unknown as Error).message).toBeTruthy();
    });
  });

  describe('Testing create method', () => {
    it('should catch an error', async () => {
      const rsp = await controller.create(
        {} as Request,
        {} as Response,
        err => err
      );

      expect((rsp as unknown as Error).message).toBeTruthy();
    });
  });
});
