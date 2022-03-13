import {
  JwtPayload,
  sign,
  verify,
  decode,
  SignOptions,
  VerifyOptions,
} from 'jsonwebtoken';
import { env } from '@env';
import { Unauthorized } from '@exceptions';
import { ObjectId } from '@interfaces/common.interface';

interface Token extends JwtPayload {
  id: string;
}

export class JWT {
  private static Instance: JWT;

  private readonly access_secret = env.token.SECRET_KEY;

  private readonly refresh_secret = env.token.SECRET_REFRESH_KEY;

  private readonly access_expiry_time = env.token.EXP;

  private readonly refresh_expiry_time = env.token.EXP_REFRESH;

  private constructor() {}

  static get instance() {
    if (!this.Instance) {
      this.Instance = new JWT();
    }
    return this.Instance;
  }

  private getSecret(refresh: boolean) {
    return !refresh ? this.access_secret : this.refresh_secret;
  }

  private getExpires(refresh: boolean) {
    return !refresh ? this.access_expiry_time : this.refresh_expiry_time;
  }

  private getSignOptions(
    issuer: string,
    subject: string,
    refresh: boolean
  ): SignOptions {
    return {
      expiresIn: this.getExpires(refresh),
      algorithm: 'HS512',
      mutatePayload: false,
      issuer,
      subject,
    };
  }

  private getVerifyOptions(issuer: string, subject: string): VerifyOptions {
    return {
      algorithms: ['HS512'],
      issuer,
      subject,
    };
  }

  signToken(id: ObjectId, refresh = false) {
    return sign(
      { id },
      this.getSecret(refresh),
      this.getSignOptions('user', 'application token', refresh)
    );
  }

  verifyToken(token: string, refresh = false) {
    try {
      return verify(
        token,
        this.getSecret(refresh),
        this.getVerifyOptions('user', 'application token')
      ) as Token;
    } catch {
      throw new Unauthorized({ message: 'Token verification failed' });
    }
  }

  decodeToken(token: string) {
    return decode(token) as Token;
  }
}
