import { request, signInHelper, signOutHelper } from '../__mocks__';

export const activityRoutes = () => {
  describe('Testing activity routes', () => {
    let id: string;
    let token: string;

    beforeAll(async () => {
      token = await signInHelper();
    });

    afterAll(async () => {
      await signOutHelper(token);
    });

    it('should get activities', async () => {
      const rsp = await request.get({ url: '/activities', token });

      id = rsp.body.result[rsp.body.result.length - 1]._id;

      expect(rsp.body.result.length).toEqual(20);
    });

    it('should paginate activities', async () => {
      const rsp = await request.get({ url: `/activities?id=${id}`, token });

      expect(rsp.body.result.length).toEqual(20);
    });
  });
};
