import {
  BadRequest,
  Forbidden,
  InternalServerError,
  NotFound,
  Unauthorized,
} from '@exceptions';

describe('Testing exceptions', () => {
  test('BadRequest', () => {
    const http = new BadRequest();
    expect(http.message).toEqual('Bad Request');
  });

  test('Forbidden', () => {
    const http = new Forbidden();
    expect(http.message).toEqual('Forbidden');
  });

  test('InternalServerError', () => {
    const http = new InternalServerError();
    expect(http.message).toEqual('Internal Server Error');
  });

  test('NotFound', () => {
    const http = new NotFound();
    expect(http.message).toEqual('Not Found');
  });

  test('Unauthorized', () => {
    const http = new Unauthorized();
    expect(http.message).toEqual('Unauthorized');
  });
});
