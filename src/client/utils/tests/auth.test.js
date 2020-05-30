import { parseToken } from '../auth';

const tokenMock = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';

const payloadMock = {
  sub: '1234567890',
  name: 'John Doe',
  iat: 1516239022,
};

describe('auth utils', () => {
  test('It returns the error', () => {
    expect(parseToken(tokenMock)).toEqual(payloadMock);
  });
});
