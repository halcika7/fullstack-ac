import { RequestHandlerAuth } from '@interfaces/auth.interface';
import { Unauthorized } from '@exceptions';
import { UserRepository } from '@repository/user.repository';
import { JWT } from '@lib/jwt.lib';

const userRepository = UserRepository.instance;
const jwt = JWT.instance;

export const authMiddleware: RequestHandlerAuth = async (req, _, next) => {
  const token = req.headers.authorization?.split('Bearer ')[1];

  try {
    if (!token) throw Error('Token not provided');

    const { id } = jwt.verifyToken(token);

    const user = await userRepository.getById(id);

    if (!user) throw Error('User does not exist');

    req.user = user;

    return next();
  } catch (err) {
    return next(new Unauthorized({ message: err.message }));
  }
};
