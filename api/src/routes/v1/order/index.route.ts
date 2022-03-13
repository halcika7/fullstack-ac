import { OrderController } from '@controllers/order.controller';
import { ValidateMongoIdQuery } from '@dto/common.dto';
import { CreateOrderDto } from '@dto/order.dto';
import { UserRoles } from '@enums/user-roles.enum';
import { authMiddleware } from '@middlewares/auth.middleware';
import permit from '@middlewares/permit.middleware';
import { validator } from '@middlewares/validator.middleware';
import { Router } from 'express';

export class OrderRoutes {
  private readonly router: Router = Router();

  private readonly controller = new OrderController();

  get routes(): Router {
    this.router.post(
      '/orders',
      authMiddleware,
      permit(UserRoles.customer),
      validator(CreateOrderDto, 'body'),
      this.controller.create
    );

    this.router.get(
      '/orders',
      authMiddleware,
      validator(ValidateMongoIdQuery, 'query'),
      this.controller.getOrders
    );

    this.router.get(
      '/orders/by-month',
      authMiddleware,
      this.controller.getNumberOfOrdersByMonth
    );

    return this.router;
  }
}
