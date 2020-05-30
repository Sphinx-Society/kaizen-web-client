import axios from 'axios';
import Auth from './Auth';
import { getCookie, deleteCookie } from '../utils/cookie';
import { getErrorType } from '../utils/error';
import { login } from '../routes/paths';

class Request extends Auth {
  constructor() {
    super();
    this.apiUrl = `${process.env.API_URL}/${process.env.API_VERSION}`;
    this.token = getCookie('token');
    this.axios = axios;

    this._initAxiosDefaults();
  }

  _initAxiosDefaults() {
    this._setAuthorizationHeader();
    this._setInterceptors();
  }

  _setAuthorizationHeader() {
    if (this.token) {
      this.axios.defaults.headers = {
        Authorization: `Bearer ${this.token}`,
      };
    }
  }

  _setInterceptors() {
    this.axios.interceptors.response.use(null, (error) => {
      const err = getErrorType(error);
      const status = err.statusCode || err.status;
      // if (status === 401) {
      //   deleteCookie('token');
      //   deleteCookie('uid');
      //   const { pathname } = document.location;
      //   if (pathname !== login()) {
      //     document.location = login();
      //   }
      // }
      throw err;
    });
  }
}

export default Request;
