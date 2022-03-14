import { CreateProgramDto, ProgramOptionDto } from '@dto/program.dto';
import { HttpStatusCode } from '@enums/http-status.enum';
import { env } from '@utils/env.util';
import { signInHelper, request, signOutHelper } from '../__mocks__';

export const programRoutes = () => {
  describe('Testing program routes', () => {
    let token: string;
    let id: string;

    beforeAll(async () => {
      token = await signInHelper();
    });

    afterAll(async () => {
      await signOutHelper(token);
    });

    describe('Testing get programs', () => {
      it('should get programs', async () => {
        const rsp = await request.get({ url: '/program', token });

        id = rsp.body.result[0]._id;

        expect(rsp.statusCode).toEqual(HttpStatusCode.OK);
      });
    });

    describe('Testing get program', () => {
      it('should fail to get program', async () => {
        const rsp = await request.get({
          url: '/program/61e9893c8b744ae645a8a3b8',
          token,
        });

        expect(rsp.body.message).toEqual('Program not found');
      });

      it('should fil to get program for customers', async () => {
        const customerToken = await signInHelper(
          env.users.test,
          env.users.test_pass
        );
        const rsp = await request.get({
          url: `/program/622e0dd047f5ddfd07b780fb`,
          token: customerToken,
        });

        expect(rsp.statusCode).toEqual(HttpStatusCode.FORBIDDEN);
      });

      it('should get program', async () => {
        const rsp = await request.get({
          url: `/program/${id}`,
          token,
        });

        expect(rsp.statusCode).toEqual(HttpStatusCode.OK);
      });
    });

    describe('Testing update program', () => {
      it('should fail to update program', async () => {
        const program = await request.get({
          url: `/program/${id}`,
          token,
        });
        const rsp = await request
          .put({ url: `/program/61e9893c8b744ae645a8a3b8`, token })
          .send({
            options: program.body.result.options.map(
              ({ _id: _, ...rest }: ProgramOptionDto) => rest
            ),
            name: 'Program name updated',
          });

        expect(rsp.statusCode).toEqual(HttpStatusCode.NOT_FOUND);
      });

      it('should update program', async () => {
        const program = await request.get({
          url: `/program/${id}`,
          token,
        });
        const rsp = await request.put({ url: `/program/${id}`, token }).send({
          options: program.body.result.options.map(
            ({ _id: _, ...rest }: ProgramOptionDto) => rest
          ),
          name: 'Program name updated',
        });

        expect(rsp.statusCode).toEqual(HttpStatusCode.OK);
      });
    });

    describe('Testing delete programs', () => {
      it('should fail to delete programs', async () => {
        const rsp = await request
          .delete({ url: '/program', token })
          .send({ ids: ['61e9893c8b744ae645a8a3b8'] });

        expect(rsp.body.message).toEqual('Nothing to delete');
      });

      it('should delete programs', async () => {
        const rsp = await request
          .delete({ url: `/program`, token })
          .send({ ids: [id] });

        expect(rsp.statusCode).toEqual(HttpStatusCode.OK);
      });
    });

    describe('Testing create program', () => {
      it('should create program', async () => {
        const program: CreateProgramDto = {
          name: 'Test program 1',
          options: [
            {
              mini_bus: 5,
              name: 'test option 1',
              pickup: 4,
              price: 5,
              sedan: 1,
              suv: 1,
            },
          ],
        };
        const rsp = await request
          .post({ url: '/program', token })
          .send(program);

        expect(rsp.statusCode).toEqual(HttpStatusCode.CREATED);
      });
    });
  });
};
