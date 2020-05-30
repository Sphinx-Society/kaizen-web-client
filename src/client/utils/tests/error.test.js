import { getErrorType } from '../error';

const responseError = { response: 'response' };
const dataError = { response: { data: 'data' } };
const error = new Error();

describe('error utils', () => {
  test('It returns the error', () => {
    expect(getErrorType(responseError)).toBe(responseError.response);
    expect(getErrorType(dataError)).toBe(dataError.response.data);
    expect(getErrorType(error)).toBe(error);
  });
});
