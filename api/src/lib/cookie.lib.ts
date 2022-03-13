import { CookieOptions, Response } from 'express';
import { env } from '@env';

const { IS_PRODUCTION, token: EnvToken } = env;

export class Cookie {
  private static Instance: Cookie;

  private readonly _refreshName = EnvToken.TOKEN_REFRESH_NAME;

  private readonly _refreshOptions: CookieOptions = {
    httpOnly: true,
    path: EnvToken.TOKEN_REFRESH_PATH,
    sameSite: 'strict',
    secure: IS_PRODUCTION,
  };

  private constructor() {}

  static get instance() {
    if (!this.Instance) {
      this.Instance = new Cookie();
    }
    return this.Instance;
  }

  setRefreshToken(res: Response, token: string) {
    res.cookie(this._refreshName, token, this._refreshOptions);
  }
}
