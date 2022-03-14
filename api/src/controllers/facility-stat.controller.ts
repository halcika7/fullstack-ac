import { ResponseBuilder } from '@utils/response.util';
import { HttpStatusCode } from '@enums/http-status.enum';
import { RequestHandlerAuth } from '@interfaces/auth.interface';
import { FacilityStatRepository } from '@repository/facility-stat.repository';

export class FacilityController {
  private readonly facilityStatRepository = FacilityStatRepository.instance;

  getStats: RequestHandlerAuth = async (_, res, __) => {
    const data = await this.facilityStatRepository.getOne();

    return new ResponseBuilder(res)
      .setResponseStatus(HttpStatusCode.OK)
      .setData(data)
      .build();
  };
}
