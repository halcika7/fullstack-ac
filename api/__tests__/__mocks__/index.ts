import 'reflect-metadata';
import { HttpStatusCode } from '@enums/http-status.enum';
import { Response } from 'supertest';
import { env } from '@utils/env.util';
import { instance } from './util';

export const request = instance.getRequest();

export const start = async () => {
  await instance.start();
};

export const cleanup = async () => {
  await instance.close();
};

export const getToken = (rsp: Response) => {
  return rsp.body.result.token;
};

export const signInHelper = async (
  username = env.users.admin,
  password = env.users.admin_pass
) => {
  const rsp = await request
    .post({ url: '/auth/login' })
    .send({ username, password })
    .expect(HttpStatusCode.OK);

  return getToken(rsp);
};

export const signOutHelper = async (token: string) => {
  await request.post({ url: '/auth/logout', token }).expect(HttpStatusCode.OK);
};

export const getMeId = async (jwt: string) => {
  const token = jwt ?? (await signInHelper());
  const rsp = await request
    .get({ url: '/auth/me', token })
    .send()
    .expect(HttpStatusCode.OK);
  return rsp.body.result._id;
};
