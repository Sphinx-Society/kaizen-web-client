import { getCookie, deleteCookie } from '../cookie';

const setUp = () => {
  document.cookie = 'token=1';
  document.cookie = 'uid=2';
  document.cookie = 'role=admin';
};

describe('getCookie utils', () => {
  beforeEach(() => setUp());

  test('It returns the cookie by it name', () => {
    expect(getCookie('token')).toBe('1');
    expect(getCookie('uid')).toBe('2');
    expect(getCookie('role')).toBe('admin');
  });

  test('It returns null if the cookie dont exists', () => {
    expect(getCookie('tokens')).toBe(null);
  });
});

describe('deleteCookie utils', () => {
  beforeEach(() => setUp());

  test('It transform succesfully the cookie', () => {
    deleteCookie('token');
    expect(getCookie('token')).toBe(null);
  });
});
