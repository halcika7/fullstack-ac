import { RequestHandler } from 'express';

import { AuthService } from '@services/auth.service';

import { RequestHandlerAuth } from '@interfaces/auth.interface';
import { ResponseBuilder } from '@utils/response.util';
import { HttpStatusCode } from '@enums/http-status.enum';
import { Cookie } from '@lib/cookie.lib';
import { env } from '@utils/env.util';
import { ActivityService } from '@services/activity.service';

export class AuthController {
  private readonly authService = AuthService.instance;

  private readonly activityService = ActivityService.instance;

  private readonly cookie = Cookie.instance;

  login: RequestHandler = async (req, res, next) => {
    try {
      const { accessToken, refreshToken } = await this.authService.login(
        req.body
      );

      this.cookie.setRefreshToken(res, refreshToken);

      return new ResponseBuilder(res)
        .setResponseStatus(HttpStatusCode.OK)
        .setData({ token: accessToken })
        .build();
    } catch (error) {
      return next(error);
    }
  };

  register: RequestHandler = async (req, res, next) => {
    try {
      await this.authService.register(req.body);

      return new ResponseBuilder(res)
        .setResponseStatus(HttpStatusCode.CREATED)
        .build();
    } catch (error) {
      return next(error);
    }
  };

  logout: RequestHandlerAuth = async (req, res, __) => {
    this.activityService.createLogout(req.user!._id);
    this.cookie.setRefreshToken(res, '');
    return new ResponseBuilder(res)
      .setResponseStatus(HttpStatusCode.OK)
      .build();
  };

  refreshToken: RequestHandler = async (req, res, _) => {
    const token: string = req.cookies[env.token.TOKEN_REFRESH_NAME];
    const check = !req.query.firstCheck;

    try {
      const { accessToken, refreshToken } = await this.authService.refresh(
        token
      );

      this.cookie.setRefreshToken(res, refreshToken);

      return new ResponseBuilder(res)
        .setResponseStatus(HttpStatusCode.OK)
        .setData({ token: accessToken })
        .build();
    } catch (error) {
      this.cookie.setRefreshToken(res, '');
      const status = check ? HttpStatusCode.UNAUTHORIZED : HttpStatusCode.OK;
      return new ResponseBuilder(res)
        .setResponseStatus(status)
        .setData({ message: check ? 'Unauthorized request' : 'Not logged in' })
        .build();
    }
  };

  getMe: RequestHandlerAuth = async (req, res, _) => {
    return new ResponseBuilder(res)
      .setResponseStatus(HttpStatusCode.OK)
      .setData(req.user)
      .build();
  };
}
