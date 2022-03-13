import { start, cleanup } from '../__mocks__';
import { activityRoutes } from './activity.spec';
import { authRoutes } from './auth.spec';
import { orderRoutes } from './order.spec';
import { profileRoutes } from './profile.spec';
import { programRoutes } from './program.spec';

describe('Testing routes', () => {
  beforeAll(async () => {
    await start();
  });

  afterAll(async () => {
    await cleanup();
  });

  authRoutes();

  activityRoutes();

  orderRoutes();

  programRoutes();

  profileRoutes();
});
