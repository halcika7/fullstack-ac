import { HttpStatusCode } from '@enums/http-status.enum';
import { env } from '@utils/env.util';
import { getMeId, request, signInHelper } from '../__mocks__';

export const profileRoutes = () => {
  describe('Testing profile routes', () => {
    describe('Testing update profile', () => {
      it('should fail to update profile', async () => {
        const token = await signInHelper(env.users.test, env.users.test_pass);
        const id = await getMeId(token);
        const rsp = await request
          .patch({ url: '/profile', token })
          .send({ username: 'admin', _id: id });

        expect(rsp.statusCode).toEqual(HttpStatusCode.BAD_REQUEST);
      });

      it('should update profile', async () => {
        const token = await signInHelper(env.users.test, env.users.test_pass);
        const id = await getMeId(token);
        const rsp = await request.patch({ url: '/profile', token }).send({
          username: 'test',
          _id: id,
          first_name: 'name',
          last_name: 'last_name',
          password: '1234567890@Q2d',
          confirmPassword: '1234567890@Q2d',
        });

        expect(rsp.statusCode).toEqual(HttpStatusCode.OK);
      });
    });
  });
};
