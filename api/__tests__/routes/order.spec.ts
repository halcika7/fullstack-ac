import { HttpStatusCode } from '@enums/http-status.enum';
import { env } from '@utils/env.util';
import { request, signInHelper } from '../__mocks__';

export const orderRoutes = () => {
  describe('Testing order routes', () => {
    describe('Testing get orders', () => {
      let id: string;

      it('should get all facility orders', async () => {
        const token = await signInHelper();
        const rsp = await request.get({ url: '/orders', token });

        id = rsp.body.result[rsp.body.result.length - 1]._id;

        expect(rsp.body.result.length).toBeTruthy();
      });

      it('should paginate get all facility orders', async () => {
        const token = await signInHelper();
        const rsp = await request.get({ url: `/orders?id=${id}`, token });

        expect(rsp.body.result.length).toBeTruthy();
      });

      it('should get all customer orders', async () => {
        const token = await signInHelper(env.users.test, env.users.test_pass);
        const rsp = await request.get({ url: '/orders', token });

        expect(rsp.body.result.length).toBeTruthy();
      });
    });

    describe('Testing get orders by month', () => {
      it('should get all facility orders by month', async () => {
        const token = await signInHelper();
        const rsp = await request.get({ url: '/orders/by-month', token });

        expect(rsp.body.result.length).toEqual(12);
      });

      it('should get all customer orders by month', async () => {
        const token = await signInHelper(env.users.test, env.users.test_pass);
        const rsp = await request.get({ url: '/orders/by-month', token });

        expect(rsp.body.result.length).toEqual(12);
      });
    });

    describe('Testing create order', () => {
      it('should fail to create order', async () => {
        const token = await signInHelper(env.users.test, env.users.test_pass);

        const rsp = await request.post({ url: '/orders', token }).send({
          car_type: 'bmw',
          discount: 0,
          options: [{ name: 'name', price: 10 }],
          price: 10,
          total_price: 10,
        });

        expect(rsp.statusCode).toEqual(HttpStatusCode.BAD_REQUEST);
      });

      it('should create order', async () => {
        const token = await signInHelper(env.users.test, env.users.test_pass);

        const rsp = await request.post({ url: '/orders', token }).send({
          car_type: 'minibus',
          discount: 10,
          options: [{ name: 'name', price: 10 }],
          price: 10,
          total_price: 9,
        });

        expect(rsp.statusCode).toEqual(HttpStatusCode.CREATED);
      });
    });
  });
};
