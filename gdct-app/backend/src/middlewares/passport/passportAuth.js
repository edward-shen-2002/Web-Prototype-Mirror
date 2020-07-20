import dotenv from 'dotenv';
import jwt from 'express-jwt';

dotenv.config();

const getTokenFromHeaders = req => {
  const {
    headers: { authorization },
  } = req;

  if (authorization) {
    const authArray = authorization.split(' ');
    if (authArray[0] === 'Bearer') {
      return authArray[1];
    }
  } else if (req.cookies && req.cookies.token) {
    return req.cookies.token;
  }
  return null;
};

const auth = {
  required: jwt({
    secret: process.env.JWT_SECRET,
    userProperty: 'payload',
    algorithms: ['HS256'],
    getToken: getTokenFromHeaders,
  }),
  optional: jwt({
    secret: process.env.JWT_SECRET,
    userProperty: 'payload',
    algorithms: ['HS256'],
    getToken: getTokenFromHeaders,
    credentialsRequired: false,
  }),
};

export default auth;
