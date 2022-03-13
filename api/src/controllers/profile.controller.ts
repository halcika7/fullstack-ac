import { ResponseBuilder } from '@utils/response.util';
import { HttpStatusCode } from '@enums/http-status.enum';
import { RequestHandlerAuth } from '@interfaces/auth.interface';
import { UserRepository } from '@repository/user.repository';

export class ProfileController {
  private readonly userRepository = UserRepository.instance;

  updateProfile: RequestHandlerAuth = async (req, res, next) => {
    try {
      const data = await this.userRepository.updateUserProfile(
        req.user!._id,
        req.body
      );

      return new ResponseBuilder(res)
        .setResponseStatus(HttpStatusCode.OK)
        .setData(data)
        .build();
    } catch (error) {
      return next(error);
    }
  };
}
