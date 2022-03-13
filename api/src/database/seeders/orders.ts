import { CreateActivityDto } from '@dto/activity.dto';
import { CreateOrderDto } from '@dto/order.dto';
import { cars } from '@interfaces/car.interface';
import { ObjectId } from '@interfaces/common.interface';

const getRandomNumber = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1) + min);

const getDateBetween = (start: Date, end: Date) => {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
};

export const seedOrders = (customer: ObjectId) => {
  const activities: CreateActivityDto[] = [];
  const userStats = { number_of_orders: 1000, money_spent: 0 };
  const facilityStats = {
    number_of_customers: 1,
    money_earned: 0,
    number_of_given_discounts: 0,
    money_discount: 0,
  };

  const endDate = new Date();
  const currentYear = endDate.getFullYear();
  const startDate = new Date(`01/01/${currentYear}`);

  const orders = Array(1000)
    .fill(null)
    .map<CreateOrderDto>((_, i) => {
      const car = cars[getRandomNumber(0, 3)];
      const discount = (i + 1) % 10 === 0 ? 10 : 0;
      const price = getRandomNumber(10, 60);
      const total = discount ? price - price * 0.1 : price;
      userStats.money_spent += total;
      activities.push({
        activity_type: 'order-created',
        customer,
        details: { total, discount, car_type: car },
      });
      facilityStats.money_earned += total;

      if (discount) {
        facilityStats.number_of_given_discounts += 1;
        facilityStats.money_discount += price - total;
      }

      return {
        car_type: car,
        customer,
        discount,
        options: [{ name: 'Test Program', price }],
        price,
        total_price: total,
        createdAt: getDateBetween(startDate, endDate),
      };
    });

  return { orders, activities, userStats, facilityStats };
};
