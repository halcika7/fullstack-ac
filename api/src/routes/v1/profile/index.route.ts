import { ProfileController } from '@controllers/profile.controller';
import { UpdateUserDto } from '@dto/user.dto';
import { authMiddleware } from '@middlewares/auth.middleware';
import { validator } from '@middlewares/validator.middleware';
import { Router } from 'express';

export class ProfileRoutes {
  private readonly router: Router = Router();

  private readonly controller = new ProfileController();

  get routes(): Router {
    this.router.patch(
      '/profile',
      authMiddleware,
      validator(UpdateUserDto, 'body'),
      this.controller.updateProfile
    );

    return this.router;
  }
}
