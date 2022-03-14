import { FacilityController } from '@controllers/facility-stat.controller';
import { UserRoles } from '@enums/user-roles.enum';
import { authMiddleware } from '@middlewares/auth.middleware';
import permit from '@middlewares/permit.middleware';
import { Router } from 'express';

export class FacilityRoutes {
  private readonly router: Router = Router();

  private readonly controller = new FacilityController();

  get routes(): Router {
    this.router.get(
      '/facility-stats',
      authMiddleware,
      permit(UserRoles.admin),
      this.controller.getStats
    );

    return this.router;
  }
}
