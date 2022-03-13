import { ResponseBuilder } from '@utils/response.util';
import { HttpStatusCode } from '@enums/http-status.enum';
import { ProgramService } from '@services/program.service';
import { RequestHandlerAuth } from '@interfaces/auth.interface';

export class ProgramController {
  private readonly programService = ProgramService.instance;

  createProgram: RequestHandlerAuth = async (req, res, next) => {
    try {
      const data = await this.programService.create(req.body);

      return new ResponseBuilder(res)
        .setResponseStatus(HttpStatusCode.CREATED)
        .setData(data)
        .build();
    } catch (error) {
      return next(error);
    }
  };

  getPrograms: RequestHandlerAuth = async (_, res, __) => {
    const data = await this.programService.getPrograms();

    return new ResponseBuilder(res)
      .setResponseStatus(HttpStatusCode.OK)
      .setData(data)
      .build();
  };

  getProgram: RequestHandlerAuth = async (req, res, next) => {
    try {
      const data = await this.programService.getProgram(req.params.id);

      return new ResponseBuilder(res)
        .setResponseStatus(HttpStatusCode.OK)
        .setData(data)
        .build();
    } catch (error) {
      return next(error);
    }
  };

  updateProgram: RequestHandlerAuth = async (req, res, next) => {
    try {
      const data = await this.programService.update(req.params.id, req.body);

      return new ResponseBuilder(res)
        .setResponseStatus(HttpStatusCode.OK)
        .setData(data)
        .build();
    } catch (error) {
      return next(error);
    }
  };

  deletePrograms: RequestHandlerAuth = async (req, res, next) => {
    try {
      const data = await this.programService.deletePrograms(req.body.ids);

      return new ResponseBuilder(res)
        .setResponseStatus(HttpStatusCode.OK)
        .setData(data)
        .build();
    } catch (error) {
      return next(error);
    }
  };
}
