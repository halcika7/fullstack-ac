import { Router } from 'express';
import { ActivityRoutes } from './activity/index.route';
import { AuthRoutes } from './auth/index.route';
import { FacilityRoutes } from './facility/index.route';
import { OrderRoutes } from './order/index.route';
import { ProfileRoutes } from './profile/index.route';
import { ProgramRoutes } from './program/index.route';

export class V1Routes {
  private readonly router: Router = Router();

  get routes(): Router {
    this.router.use('/v1', [
      new AuthRoutes().routes,
      new ProgramRoutes().routes,
      new OrderRoutes().routes,
      new ActivityRoutes().routes,
      new ProfileRoutes().routes,
      new FacilityRoutes().routes,
    ]);

    return this.router;
  }
}
