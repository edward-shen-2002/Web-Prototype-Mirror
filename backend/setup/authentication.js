import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";

import { Strategy as LocalStrategy } from "passport-local";

import { 
  PASSPORT_JWT,
  SECRET_KEY,

  ERROR_AUTH_FAIL,
  ERROR_DATABASE,

  HTTP_ERROR_AUTH_FAIL,
  HTTP_ERROR_DATABASE,
  PASSPORT_LOGIN,
  PASSPORT_REGISTER
} from "../config/constants";


/**
 * User passport authentication.
 * 
 * This checks for the user's username in the token
 */
const userAuthentication = ({ passport, UserModel }) => {
  passport.use(PASSPORT_JWT, new JwtStrategy({ jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), secretOrKey: SECRET_KEY, session: false }, (payload, done) => {
    UserModel.findOne({ username: payload.id })
      // The user info will be found in req.user in routes
      // https://stackoverflow.com/questions/30796481/pass-user-info-in-routes-from-passport-strategies
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
        result ? done(null, result) : done(null, false, { message: "Unable to login user" });
      }
    })
  }))
};

/**
 * Passport authentication for Register. Receives a username, password, name, and email from the user's request.
 * 
 * Checks the database for existing `username` and `email`. Usernames and emails must be unique.
 */
const registerAuthentication = ({ passport, UserModel }) => {
  passport.use(PASSPORT_REGISTER, new LocalStrategy({ passReqToCallback: true, session: false }, (_req, username, password, done) => {
    UserModel.register({ username, active: true }, password, (error, result) => {
      if(error) {
        done(error);
      } else {
        result ? done(null, result) : done(null, false, { message: "Unable to register user" });
      }
    })
  }));
}

export const userAuthenticationMiddleware = (req, res, next) => {
  passport.authenticate(PASSPORT_JWT, { session: false }, (error, _user, info) => {
    if(error) {
      console.error(ERROR_AUTH_FAIL, error);
      res.status(HTTP_ERROR_AUTH_FAIL).json({ default: error });
    } else if(info) {
      console.error(ERROR_DATABASE, info);
      res.status(HTTP_ERROR_DATABASE).json({ default: info });
    
    // User found 
    } else {
      next();
    }
  })(req, res, next);
};

const setupAuthentication = (helpers) => {
  userAuthentication(helpers);
  loginAuthentication(helpers);
  registerAuthentication(helpers);
};

export default setupAuthentication;