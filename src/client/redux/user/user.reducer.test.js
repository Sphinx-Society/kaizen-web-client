import reducer, { initialState } from './user.reducer';

describe('Login Reducer', () => {
  test('Should return default state', () => {
    const newState = reducer(initialState, {});
    expect(newState).toEqual(initialState);
  });

  test('Should return new state if receiving type', () => {
    const userMock = { name: 'test' };
    const newState = reducer(initialState, {
      type: 'USER/SET_USER',
      payload: { user: { name: 'test' } },
    });
    expect(newState.user).toEqual(userMock);
  });
});
