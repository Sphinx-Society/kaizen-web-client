import jwt from 'jsonwebtoken';

class Auth {
  constructor() {
    this.jwt = jwt;
    this.__secret__ = process.env.AUTH_JWT_SECRET;
    this.cookieAge = 86400;
  }

  verifyToken(token) {
    return this.jwt.verify(token, this.__secret__);
  }
}

export default Auth;
