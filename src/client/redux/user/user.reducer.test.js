import reducer, { initialState } from './user.reducer';
import { setUser, setUsers, setEditingUser, setSelectedTests } from './user.actions';

const userMock = { user: { name: 'test' } };
const editingUserMock = { editingUser: { name: 'test' } };
const usersMock = { users: ['user', 'bruce'] };
const selectedTestsMock = { selectedTests: ['user', 'bruce'] };

describe('User Reducer', () => {
  test('Should return default state', () => {
    const newState = reducer(initialState, {});
    expect(newState).toEqual(initialState);
  });

  test('USER/SET_USER', () => {
    const newState = reducer(initialState, setUser(userMock));
    expect(newState.user.name).toEqual('test');
  });

  test('USER/SET_USERS', () => {
    const newState = reducer(initialState, setUsers(usersMock));
    expect(newState.users.includes('bruce')).toBe(true);
  });

  test('USER/SET_EDITING_USER', () => {
    const newState = reducer(initialState, setEditingUser(editingUserMock));
    expect(newState.editingUser.name).toEqual('test');
  });

  test('USER/SET_SELECTED_TESTS', () => {
    const newState = reducer(initialState, setSelectedTests(selectedTestsMock));
    expect(newState.selectedTests.includes('bruce')).toBe(true);
  });
});
