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
const userAuthentication = (passport, { UserModel }) => {
  passport.use(PASSPORT_JWT, new JwtStrategy({ jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), secretOrKey: SECRET_KEY, session: false }, (payload, done) => {
    UserModel.findOne({ username: payload.id })
      // The user info will be found in req.user in routes
      // https://stackoverflow.com/questions/30796481/pass-user-info-in-routes-from-passport-strategies
      .then((user) => done(null, user ? user : false))
      .catch((error) => done(error, false));
    })
  );
};

const loginAuthentication = (passport, { UserModel }) => {
  passport.use(PASSPORT_LOGIN, new LocalStrategy({ session: false }, (username, password, done) => {
    UserModel.findOne({ username, password })
      .then((user) => user ? done(null, user) : done(null, false, { message: ERROR_CREDENTIALS }))
      .catch((error) => done(error));
    }
  ));
};

/**
 * Passport authentication for Register. Receives a username, password, name, and email from the user's request.
 * 
 * Checks the database for existing `username` and `email`. Usernames and emails must be unique.
 */
const registerAuthentication = (passport, { UserModel }) => {
  passport.use(PASSPORT_REGISTER, new LocalStrategy({ passReqToCallback: true, session: false }, (req, username, password, done) => {
    const { email } = req.body;
    UserModel.find()
      .or([ { username }, { email } ])
      .then((users) => {
        if(users.length === 0){
          UserModel.create({ username, email, password })
            .then((user) => done(null, user))
            .catch((error) => done(error));
        } else{
          let info = {};
          users.forEach((user) => {
            if(user.username === username) info["username"] = ERROR_CONFLICT_USERNAME;

            if(user.email === email) info["email"] = ERROR_CONFLICT_EMAIL;
          });
          
          return done(null, false, info);
        } 
      }) 
      .catch((error) => done(error));
    })
  );
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

export const setupAuthentication = (passport, helpers) => {
  userAuthentication(passport, helpers);
  loginAuthentication(passport, helpers);
  registerAuthentication(passport, helpers);
};