import { AuthController } from '@controllers/auth.controller';
import { LoginDto } from '@dto/auth.dto';
import { CreateUserDto } from '@dto/user.dto';
import { authMiddleware } from '@middlewares/auth.middleware';
import { validator } from '@middlewares/validator.middleware';
import { Router } from 'express';

export class AuthRoutes {
  private readonly router: Router = Router();

  private readonly controller = new AuthController();

  get routes(): Router {
    this.router.post(
      '/auth/login',
      validator(LoginDto, 'body'),
      this.controller.login
    );

    this.router.post(
      '/auth/register',
      validator(CreateUserDto, 'body'),
      this.controller.register
    );

    this.router.post('/auth/logout', authMiddleware, this.controller.logout);

    this.router.get('/auth/refresh', this.controller.refreshToken);

    this.router.get('/auth/me', authMiddleware, this.controller.getMe);

    return this.router;
  }
}
