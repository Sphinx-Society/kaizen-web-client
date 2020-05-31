import Request from '../Request';

const setUp = () => {
  document.cookie = 'token=1';
};

describe('Request service', () => {
  beforeEach(() => setUp());

  test('Attributes', () => {
    const RequestService = new Request();
    expect(RequestService.token).toEqual('1');
    expect(RequestService.cookieAge).toEqual(86400);
    expect(RequestService.apiUrl).toEqual(`${process.env.REACT_APP_API_URL}/${process.env.REACT_APP_API_VERSION}`);
    expect(RequestService.axios.defaults.headers.Authorization).toEqual('Bearer 1');
  });

  test('Methods', () => {
    const RequestService = new Request();
    expect(typeof RequestService._initAxiosDefaults).toEqual('function');
    expect(typeof RequestService._setAuthorizationHeader).toEqual('function');
    expect(typeof RequestService._setInterceptors).toEqual('function');
  });
});
