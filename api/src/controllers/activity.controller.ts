import { ResponseBuilder } from '@utils/response.util';
import { HttpStatusCode } from '@enums/http-status.enum';
import { RequestHandlerAuth } from '@interfaces/auth.interface';
import { ActivityRepository } from '@repository/activity.repository';

export class ActivityController {
  private readonly activityRepository = ActivityRepository.instance;

  getActivities: RequestHandlerAuth = async (req, res, next) => {
    try {
      const data = await this.activityRepository.getActivities(
        req.query.id as string
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
