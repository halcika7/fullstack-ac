import { ActivityController } from '@controllers/activity.controller';
import { ValidateMongoIdQuery } from '@dto/common.dto';
import { UserRoles } from '@enums/user-roles.enum';
import { authMiddleware } from '@middlewares/auth.middleware';
import permit from '@middlewares/permit.middleware';
import { validator } from '@middlewares/validator.middleware';
import { Router } from 'express';

export class ActivityRoutes {
  private readonly router: Router = Router();

  private readonly controller = new ActivityController();

  get routes(): Router {
    this.router.get(
      '/activities',
      authMiddleware,
      permit(UserRoles.admin),
      validator(ValidateMongoIdQuery, 'query'),
      this.controller.getActivities
    );

    return this.router;
  }
}
