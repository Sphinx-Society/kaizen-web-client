import { LOGIN } from '../../types/loginTypes';
import loginReducers from './loginReducers';

describe('Login Reducer', () => {
  test('Should return default state', () => {

    const newState = loginReducers(undefined, {});
    expect(newState).toEqual({
      isAuth: false,
      loading: false,
      error: '',
    });
  });
  test('Should return new state if receiving type', () => {
    const isAuth = true;
    const newState = loginReducers(undefined, {
      type: LOGIN,
      payload: isAuth,
    });
    expect(newState.isAuth).toEqual(isAuth);
  });
});
