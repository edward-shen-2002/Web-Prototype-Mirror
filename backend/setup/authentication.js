import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";

import { Strategy as LocalStrategy } from "passport-local";

import { secretOrKey } from "../config/jwt";

import { ROLE_USER_MANAGER, ROLE_TEMPLATE_MANAGER, ROLE_DATA_MANAGER, ROLE_ORGANIZATION_MANAGER, ROLE_PACKAGE_MANAGER } from "../constants/roles";

import { MESSAGE_ERROR_AUTH_FAIL, MESSAGE_ERROR_DATABASE, HTTP_ERROR_AUTH_FAIL, HTTP_ERROR_DATABASE, HTTP_ERROR_UNAUTHORIZED, MESSAGE_ERROR_ROLE_UNAUTHORIZED, MESSAGE_ERROR_CREDENTIALS } from "../constants/rest";
import { PASSPORT_JWT, PASSPORT_LOGIN, PASSPORT_REGISTER } from "../constants/passport"

/**
 * User passport authentication.
 * 
 * This checks for the user's username in the token
 */
const userAuthentication = ({ passport, UserModel }) => {
  passport.use(PASSPORT_JWT, new JwtStrategy({ jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), secretOrKey, session: false }, (payload, done) => {
    UserModel.findOne({ username: payload.id })
      .then((user) => done(null, user ? user : false))
      .catch((error) => done(error, false));
    })
  );
};

const loginAuthentication = ({ passport, UserModel }) => {
  passport.use(PASSPORT_LOGIN, new LocalStrategy({ session: false }, async (username, password, done) => {
    UserModel.authenticate()(username, password, (error, result) => {
      if(error) {
        done(error);
      } else {
        result ? done(null, result) : done(null, false, { message: MESSAGE_ERROR_CREDENTIALS });
      }
    })
  }));
};

/**
 * Passport authentication for Register. Receives a username, password, name, and email from the user's request.
 * 
 * Checks the database for existing `username` and `email`. Usernames and emails must be unique.
 * 
 * TODO: Specify conflicts!!!
 * TODO : Validate attributes!
 */
const registerAuthentication = ({ passport, UserModel }) => {
  passport.use(PASSPORT_REGISTER, new LocalStrategy({ passReqToCallback: true, session: false }, (req, _username, password, done) => {
    const { newUser } = req.body;

    UserModel.register({ ...newUser, password: undefined }, password)
      .then((user) => done(null, user))
      .catch(done);
  }));
};

/**
 * Authentication middleware which checks for valid tokens
 */
export const userAuthenticationMiddleware = ({ passport }) => (req, res, next) => {
  passport.authenticate(PASSPORT_JWT, { session: false }, (error, user, info) => {
    if(error) {
      console.error(MESSAGE_ERROR_DATABASE, error);
      res.status(HTTP_ERROR_DATABASE).json({ message: MESSAGE_ERROR_DATABASE });
    } else if(info) {
      console.error(MESSAGE_ERROR_AUTH_FAIL, info);
      res.status(HTTP_ERROR_AUTH_FAIL).json({ message: MESSAGE_ERROR_AUTH_FAIL, error: info });
    // User found 
    } else {
      res.locals.user = user;
      next();
    }
  })(req, res, next);
};

const adminRoleMiddleware = (_req, res, next, role) => {
  const { user: { roles } } = res.locals;
  if(roles.includes(role)) {
    next();
  } else {
    res.status(HTTP_ERROR_UNAUTHORIZED).json({ message: MESSAGE_ERROR_ROLE_UNAUTHORIZED });
  }
};

/**
 * Admin middlewares - Validates roles before passing to routes performing role actions.
 */
export const userRoleMiddleware = () => (req, res, next) => adminRoleMiddleware(req, res, next, ROLE_USER_MANAGER);

export const organizationRoleMiddleware = () => (req, res, next) => adminRoleMiddleware(req, res, next, ROLE_ORGANIZATION_MANAGER);

// export const templateRoleMiddleware = () => adminRoleMiddleware(ROLE_TEMPLATE_MANAGER)

export const dataRoleMiddleware = () => (req, res, next) => adminRoleMiddleware(req, res, next, ROLE_DATA_MANAGER);

// export const packageRoleMiddleware = () => adminRoleMiddleware(ROLE_PACKAGE_MANAGER);

// TODO : Handle other errors. Currently assumes database error occured previously.
// Final errors route. To be used for handling errors that occur at the end of the router stack.
export const generalErrorHandler = () => (error, _req, res, _next) => {
  res.status(HTTP_ERROR_DATABASE).json({ message: MESSAGE_ERROR_DATABASE, error });
};

const setupAuthentication = (helpers) => {
  userAuthentication(helpers);
  loginAuthentication(helpers);
  registerAuthentication(helpers);
};

export default setupAuthentication;