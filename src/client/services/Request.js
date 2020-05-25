import axios from 'axios';

class Request {
  constructor(token) {
    this.apiUrl = `${process.env.API_URL}/${process.env.API_VERSION}`;
    this.token = token;
    this.axios = axios;

    this._initAxiosDefaults();
  }

  _initAxiosDefaults() {
    this._setAuthorizationHeader();
  }

  _setAuthorizationHeader() {
    if (this.token) {
      this.axios.defaults.headers = {
        authorization: this.token,
      };
    }
  }
}

export default Request;
