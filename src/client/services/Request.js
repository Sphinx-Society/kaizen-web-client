import axios from 'axios';

const { API_URL } = process.env;

class Request {
  constructor(token) {
    this.apiUrl = API_URL;
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
