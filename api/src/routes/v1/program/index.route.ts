import { ProgramController } from '@controllers/program.controller';
import { ValidateMongoId } from '@dto/common.dto';
import { CreateProgramDto, DeleteProgramsDto } from '@dto/program.dto';
import { UserRoles } from '@enums/user-roles.enum';
import { authMiddleware } from '@middlewares/auth.middleware';
import permit from '@middlewares/permit.middleware';
import { validator } from '@middlewares/validator.middleware';
import { Router } from 'express';

export class ProgramRoutes {
  private readonly router: Router = Router();

  private readonly controller = new ProgramController();

  get routes(): Router {
    this.router.post(
      '/program',
      authMiddleware,
      permit(UserRoles.admin),
      validator(CreateProgramDto, 'body'),
      this.controller.createProgram
    );

    this.router.get('/program', authMiddleware, this.controller.getPrograms);

    this.router.get(
      '/program/:id',
      authMiddleware,
      permit(UserRoles.admin),
      validator(ValidateMongoId, 'params'),
      this.controller.getProgram
    );

    this.router.put(
      '/program/:id',
      authMiddleware,
      permit(UserRoles.admin),
      validator(ValidateMongoId, 'params'),
      validator(CreateProgramDto, 'body'),
      this.controller.updateProgram
    );

    this.router.delete(
      '/program',
      authMiddleware,
      permit(UserRoles.admin),
      validator(DeleteProgramsDto, 'body'),
      this.controller.deletePrograms
    );

    return this.router;
  }
}
