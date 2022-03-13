import { ResponseBuilder } from '@utils/response.util';
import { HttpStatusCode } from '@enums/http-status.enum';
import { RequestHandlerAuth } from '@interfaces/auth.interface';
import { OrderService } from '@services/order.service';
import { UserRoles } from '@enums/user-roles.enum';

export class OrderController {
  private readonly orderService = OrderService.instance;

  getOrders: RequestHandlerAuth = async (req, res, next) => {
    try {
      const customer =
        req.user!.role === UserRoles.customer
          ? req.user!._id.toString()
          : undefined;
      const data = await this.orderService.getOrders(
        customer,
        req.query.id as string
      );

      return new ResponseBuilder(res)
        .setResponseStatus(HttpStatusCode.OK)
        .setData(data)
        .build();
    } catch (error) {
      return next(error);
    }
  };

  getNumberOfOrdersByMonth: RequestHandlerAuth = async (req, res, next) => {
    try {
      const customer =
        req.user!.role === UserRoles.customer
          ? req.user!._id.toString()
          : undefined;
      const data = await this.orderService.getNumberOfOrdersByMonth(customer);

      return new ResponseBuilder(res)
        .setResponseStatus(HttpStatusCode.OK)
        .setData(data)
        .build();
    } catch (error) {
      return next(error);
    }
  };

  create: RequestHandlerAuth = async (req, res, next) => {
    try {
      const data = await this.orderService.create({
        customer: req.user!._id,
        ...req.body,
      });

      return new ResponseBuilder(res)
        .setResponseStatus(HttpStatusCode.CREATED)
        .setData(data)
        .build();
    } catch (error) {
      return next(error);
    }
  };
}
