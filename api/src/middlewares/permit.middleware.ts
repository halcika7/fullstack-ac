import { RequestHandlerAuth } from '@interfaces/auth.interface';
import { UserRoles } from '@enums/user-roles.enum';
import { Forbidden } from '@exceptions';

const permit = (...permittedRoles: UserRoles[]): RequestHandlerAuth => {
  return (req, _, next) => {
    if (permittedRoles.includes(req.user!.role)) {
      return next();
    }

    return next(new Forbidden());
  };
};

export default permit;
