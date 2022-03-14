import { HttpStatusCode } from '@enums/http-status.enum';
import { request, signInHelper } from '../__mocks__';

export const facilityStatRoutes = () => {
  describe('Testing facility stats routes', () => {
    describe('Testing get stats', () => {
      it('should get stats', async () => {
        const token = await signInHelper();
        const rsp = await request.get({ url: '/facility-stats', token });

        expect(rsp.statusCode).toEqual(HttpStatusCode.OK);
      });
    });
  });
};
