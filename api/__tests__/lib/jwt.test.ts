import { JWT } from '@lib/jwt.lib';

describe('Testing JWT', () => {
  it('should fail to verify token', () => {
    let err;
    try {
      JWT.instance.verifyToken('');
    } catch (error) {
      err = error;
    }

    expect(err).toBeTruthy();
  });
});
