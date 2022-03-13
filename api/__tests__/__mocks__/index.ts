import { HttpStatusCode } from '@enums/http-status.enum';
import { Response } from 'supertest';
import { instance } from './util';

export const request = instance.getRequest();

export const start = async () => {
  await instance.start();
};

export const cleanup = async () => {
  await instance.close();
};

export const getToken = (rsp: Response) => {
  const token = rsp.headers['set-cookie']?.map((cookie: string) =>
    cookie.replace('HttpOnly', 'HttpOnly=true')
  ) as undefined | string[];

  return token?.[0] || '';
};

export const signInHelper = async (
  email = process.env.SUPER_ADMIN_EMAIL,
  password = process.env.SUPER_ADMIN_PASS
) => {
  const rsp = await request
    .post({ url: '/auth/login' })
    .send({ email, password })
    .expect(HttpStatusCode.OK);

  return getToken(rsp);
};

export const signInProjectOwner = () =>
  signInHelper('project_owner@email.com', 'password');

export const getMeId = async (jwt: string) => {
  const token = jwt ?? (await signInHelper());
  const rsp = await request
    .get({ url: '/users/me', token })
    .send()
    .expect(HttpStatusCode.OK);
  return rsp.body._id;
};

export const sleep = async (num = 1) => {
  await new Promise(r => {
    setTimeout(r, num * 1000);
  });
};

export const profile = {
  firstName: 'name',
  lastName: 'last name',
  address: {
    street1: 'adress1',
    street2: 'address2',
    city: 'city',
    state: 'state',
    country: 'country',
    zip: 'zip',
  },
};
