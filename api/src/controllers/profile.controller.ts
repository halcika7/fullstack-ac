import { ResponseBuilder } from '@utils/response.util';
import { HttpStatusCode } from '@enums/http-status.enum';
import { RequestHandlerAuth } from '@interfaces/auth.interface';
import { UserRepository } from '@repository/user.repository';
import { Hash } from '@lib/hash.lib';

export class ProfileController {
  private readonly userRepository = UserRepository.instance;

  private readonly hash = Hash.instance;

  updateProfile: RequestHandlerAuth = async (req, res, next) => {
    try {
      if (req.body.password) {
        req.body.password = await this.hash.hash(req.body.password);
      }

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
