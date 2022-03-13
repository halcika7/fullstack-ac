import { CreateOrderDto } from '@dto/order.dto';
import { months } from '@interfaces/order.interface';
import { FacilityStatRepository } from '@repository/facility-stat.repository';
import { OrderRepository } from '@repository/order.repository';
import { UserRepository } from '@repository/user.repository';
import { ActivityService } from './activity.service';

export class OrderService {
  private static Instance: OrderService;

  private readonly orderRepository = OrderRepository.instance;

  private readonly userRepository = UserRepository.instance;

  private readonly facilityStatRepository = FacilityStatRepository.instance;

  private readonly activityService = ActivityService.instance;

  private constructor() {}

  static get instance() {
    if (!this.Instance) {
      this.Instance = new OrderService();
    }
    return this.Instance;
  }

  getOrders(customer?: string, id?: string) {
    return this.orderRepository.getOrders(customer, id);
  }

  async create(data: CreateOrderDto) {
    const order = await this.orderRepository.create(data);

    this.userRepository.incrementAfterOrder(data.customer, data.total_price);
    this.activityService.createOrder(data.customer, {
      total: data.total_price,
      discount: data.discount,
      car_type: data.car_type,
    });
    this.facilityStatRepository.incrementAfterOrder(
      data.total_price,
      data.total_price - data.price
    );

    return order;
  }

  async getNumberOfOrdersByMonth(customer?: string) {
    const orders = await this.orderRepository.getNumberOfOrdersByMonth(
      new Date().getFullYear(),
      customer
    );

    return months
      .map((month, i) => {
        const idx = orders.find(order => order.monthNumber === i);

        if (!idx) {
          return {
            month,
            'Total Earnings': 0,
            'Number of Orders': 0,
            monthNumber: i,
          };
        }

        return idx;
      })
      .slice(1);
  }
}
