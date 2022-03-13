import { AuthController } from '@controllers/auth.controller';
import { CreateUserDto } from '@dto/user.dto';
import { HttpStatusCode } from '@enums/http-status.enum';
import { env } from '@utils/env.util';
import { Request, Response } from 'express';
import { request } from '../__mocks__';

const controller = new AuthController();

export const authRoutes = () => {
  describe('Testing auth routes', () => {
    describe('Testing register route', () => {
      it('should fail to register new customer', async () => {
        const user: CreateUserDto = {
          username: 'admin',
          first_name: 'test',
          last_name: 'test',
          password: 'password@2Q',
          confirmPassword: 'password@2Qaspodk',
        };
        const rsp = await request.post({ url: '/auth/register' }).send(user);

        expect(rsp.statusCode).toEqual(HttpStatusCode.BAD_REQUEST);
      });
      it('should register new customer', async () => {
        const user: CreateUserDto = {
          username: 'test1',
          first_name: 'test',
          last_name: 'test',
          password: 'password@2Q',
          confirmPassword: 'password@2Q',
        };
        const rsp = await request.post({ url: '/auth/register' }).send(user);

        expect(rsp.statusCode).toEqual(HttpStatusCode.CREATED);
      });
    });

    describe('Testing login route', () => {
      it('should fail to login validator', async () => {
        const rsp = await request.post({ url: '/auth/login' }).send({});

        expect(rsp.body.errors).toBeTruthy();
        expect(rsp.body.message).toEqual('Bad Request');
        expect(rsp.statusCode).toEqual(HttpStatusCode.BAD_REQUEST);
      });

      it('should fail to login with nonexisting username', async () => {
        const rsp = await request.post({ url: '/auth/login' }).send({
          username: 'username',
          password: 'pass',
        });

        expect(rsp.body.message).toEqual('Invalid credentials');
        expect(rsp.statusCode).toEqual(HttpStatusCode.BAD_REQUEST);
      });

      it('should fail to login with incorrect password', async () => {
        const rsp = await request.post({ url: '/auth/login' }).send({
          username: env.users.admin,
          password: 'pass',
        });

        expect(rsp.body.message).toEqual('Invalid credentials');
        expect(rsp.statusCode).toEqual(HttpStatusCode.BAD_REQUEST);
      });

      it('should login user', async () => {
        const rsp = await request.post({ url: '/auth/login' }).send({
          username: env.users.test,
          password: env.users.test_pass,
        });

        expect(rsp.body.result.token).toBeTruthy();
        expect(rsp.statusCode).toEqual(HttpStatusCode.OK);

        const logout = await request.post({
          url: '/auth/logout',
          token: rsp.body.result.token,
        });

        expect(logout.statusCode).toEqual(HttpStatusCode.OK);
      });
    });

    describe('Testing refresh route', () => {
      it('should fail to refresh on first load', async () => {
        const rsp = await request
          .get({ url: '/auth/refresh?firstCheck=true' })
          .send({});

        expect(rsp.body.result.message).toEqual('Not logged in');
        expect(rsp.statusCode).toEqual(HttpStatusCode.OK);
      });

      it('should fail to refresh if not first load', async () => {
        const rsp = await request.get({ url: '/auth/refresh' }).send({});

        expect(rsp.body.result.message).toEqual('Unauthorized request');
        expect(rsp.statusCode).toEqual(HttpStatusCode.UNAUTHORIZED);
      });

      it('should refresh token', async () => {
        const user = await request.post({ url: '/auth/login' }).send({
          username: env.users.test,
          password: env.users.test_pass,
        });

        const rsp = await request
          .get({ url: '/auth/refresh', token: user.body.result.token })
          .send({});

        await request.post({
          url: '/auth/logout',
          token: rsp.body.result.token,
        });

        expect(rsp.body.result.token).toBeTruthy();
        expect(rsp.statusCode).toEqual(HttpStatusCode.OK);
      });
    });

    describe('Testing me route', () => {
      it('should get me', async () => {
        const rsp = await request.post({ url: '/auth/login' }).send({
          username: env.users.test,
          password: env.users.test_pass,
        });

        const me = await request.get({
          url: '/auth/me',
          token: rsp.body.result.token,
        });

        await request.post({
          url: '/auth/logout',
          token: rsp.body.result.token,
        });

        expect(me.statusCode).toEqual(HttpStatusCode.OK);
      });
    });

    describe('Testing auth middleware', () => {
      it('should fail to pass auth middleware', async () => {
        const me = await request.get({ url: '/auth/me', token: 'token' });

        expect(me.statusCode).toEqual(HttpStatusCode.UNAUTHORIZED);
      });

      it('should fail without token', async () => {
        const me = await request.get({ url: '/auth/me' });

        expect(me.statusCode).toEqual(HttpStatusCode.UNAUTHORIZED);
      });

      it('should fail to find user in database', async () => {
        const me = await request.get({
          url: '/auth/me',
          token:
            'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMmRjNzdkOGYwMzU5NDkzOTk0MmY4YiIsImlhdCI6MTY0NzE4NDg4NiwiaXNzIjoidXNlciIsInN1YiI6ImFwcGxpY2F0aW9uIHRva2VuIn0.BuYcXzL5601zSjtTUD9hkcsXRR98D5HrD0enrBX9-AEiMRtRb6zS_yPUGfkNZGr1VSRRwQTlQ2NZ_2oWBWQjag',
        });

        expect(me.statusCode).toEqual(HttpStatusCode.UNAUTHORIZED);
      });
    });

    describe('Testing auth controller', () => {
      it('should throw an error if user does not exist', async () => {
        let err;
        try {
          await controller.refreshToken(
            {
              cookies: {
                [env.token.TOKEN_REFRESH_NAME]:
                  'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMmUxODEwM2ViNTIyZWZkYjRjNDBmYiIsImlhdCI6MTY0NzE4Nzk4OCwiaXNzIjoidXNlciIsInN1YiI6ImFwcGxpY2F0aW9uIHRva2VuIn0.Fdy4arZLj2OLG6jtK1-8E-fsJAO-v7f_OPD4oCVG0Z4_mn_JM9h9V7ThaqOI9CqxSUtlvArEIqG584dqfF3z4A',
              },
              query: {},
            } as Request,
            {
              statusCode: 200,
              status: function fn(code: number) {
                (this! as Response).statusCode = code;
                return this;
              },
              json: function fn(data: unknown) {
                return data;
              },
            } as unknown as Response,
            error => error
          );
        } catch (error) {
          err = error;
        }

        expect(err.message).toBeTruthy();
      });
    });
  });
};
