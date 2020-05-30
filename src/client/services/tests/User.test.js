import User from '../User';

const setUp = () => {
  document.cookie = 'token=1';
};

describe('User Service', () => {
  beforeEach(() => setUp());

  test('Attributes', () => {
    const UserService = new User();
    expect(UserService.baseUrl).toEqual(`${UserService.apiUrl}/users`);
  });

  test('Methods', () => {
    const UserService = new User();
    expect(typeof UserService.listUsers).toEqual('function');
    expect(typeof UserService.getUser).toEqual('function');
    expect(typeof UserService.getProfile).toEqual('function');
    expect(typeof UserService.updateProfile).toEqual('function');
    expect(typeof UserService.newUser).toEqual('function');
    expect(typeof UserService.updateUser).toEqual('function');
    expect(typeof UserService.deleteUser).toEqual('function');
    expect(typeof UserService.downloadTests).toEqual('function');
    expect(typeof UserService.login).toEqual('function');
    expect(typeof UserService.listTests).toEqual('function');
  });
});
