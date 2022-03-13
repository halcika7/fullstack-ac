import { ActivityRepository } from '@repository/activity.repository';
import { FacilityStatRepository } from '@repository/facility-stat.repository';
import { OrderRepository } from '@repository/order.repository';
import { ProgramRepository } from '@repository/program.repository';
import { UserRepository } from '@repository/user.repository';
import { env } from '@utils/env.util';
import { logger } from '@utils/logger.util';
import { seedOrders } from './seeders/orders';
import { programs } from './seeders/programs';

const userRepository = UserRepository.instance;
const orderRepository = OrderRepository.instance;
const activityRepository = ActivityRepository.instance;
const facilityStatRepository = FacilityStatRepository.instance;
const programRepository = ProgramRepository.instance;

const { users } = env;

export const seedDb = async () => {
  try {
    const admin = await userRepository.getByUsername(users.admin);

    if (!admin) {
      await userRepository.create({
        first_name: 'Admin',
        last_name: 'Admin',
        username: users.admin,
        password: users.admin_pass,
        confirmPassword: users.admin_pass,
      });
    }

    let test = await userRepository.getByUsername(users.test);

    if (!test) {
      test = await userRepository.create({
        first_name: 'customer',
        last_name: 'customer',
        username: users.test,
        password: users.test_pass,
        confirmPassword: users.test_pass,
      });

      const { orders, activities, userStats, facilityStats } = seedOrders(
        test._id
      );

      test.number_of_orders = userStats.number_of_orders;
      test.money_spent = userStats.money_spent;

      await Promise.all([
        orderRepository.bulkWrite(orders),
        activityRepository.bulkWrite(activities),
        programRepository.bulkWrite(programs),
        facilityStatRepository.create(facilityStats),
        test.save(),
      ]);
    }

    return 'OK';
  } catch (error) {
    return logger.error('Seeder error', error);
  }
};
