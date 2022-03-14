import { OrderSchema } from '@schema/order.schema';
import { OrderModel } from '@model/order.model';
import { CreateOrderDto } from '@dto/order.dto';
import { FilterQuery, Types } from 'mongoose';
import { months, OrdersByMonth } from '@interfaces/order.interface';
import { Repository } from './base.repository';

type Filter = FilterQuery<OrderModel>;

export class OrderRepository extends Repository<OrderModel, CreateOrderDto> {
  private static Instance: OrderRepository;

  private constructor() {
    super('Order', OrderSchema);
  }

  static get instance() {
    if (!this.Instance) {
      this.Instance = new OrderRepository();
    }
    return this.Instance;
  }

  getOrders(customer?: string, id?: string) {
    const filter: Filter = {};

    if (customer) {
      filter.customer = customer;
    }

    if (id) {
      filter._id = { $gt: new Types.ObjectId(id) };
    }

    return this.model.find(filter).limit(20);
  }

  getNumberOfOrdersByMonth(year: number, customer?: string) {
    const match = customer ? { customer: new Types.ObjectId(customer) } : {};
    return this.model.aggregate<OrdersByMonth>([
      { $match: match },
      {
        $project: {
          year: { $year: '$createdAt' },
          month: { $month: '$createdAt' },
          monthNumber: { $month: '$createdAt' },
          total_price: 1,
        },
      },
      { $match: { year } },
      {
        $group: {
          _id: { month: '$month', monthNumber: '$monthNumber' },
          'Number of Orders': { $sum: 1 },
        },
      },
      {
        $addFields: {
          month: {
            $let: {
              vars: { monthsInString: months },
              in: { $arrayElemAt: ['$$monthsInString', '$_id.month'] },
            },
          },
          monthNumber: '$_id.monthNumber',
        },
      },
      { $project: { _id: 0, month: 1, 'Number of Orders': 1, monthNumber: 1 } },
      { $sort: { monthNumber: 1 } },
    ]);
  }
}
