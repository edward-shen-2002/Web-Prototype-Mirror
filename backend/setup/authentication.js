import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";

import { Strategy as LocalStrategy } from "passport-local";


import { secretOrKey } from "../config/jwt";

import { calculateRoleFilter } from "../tools/admin";
import { isValidMongooseObjectId } from "../tools/misc";
import { emailValidator, usernameValidator, passwordValidator, existingUsersValidator } from "../tools/validation";

import { ROLE_USER_MANAGER, ROLE_TEMPLATE_MANAGER, ROLE_ORGANIZATION_MANAGER, ROLE_PACKAGE_MANAGER, ROLE_SECTOR_MANAGER, ROLE_LEVEL_NOT_APPLICABLE } from "../constants/roles";

import { HTTP_ERROR_CONFLICT, HTTP_ERROR_AUTH_FAIL, HTTP_ERROR_DATABASE, HTTP_ERROR_UNAUTHORIZED, HTTP_ERROR_NOT_FOUND } from "../constants/rest";
import { 
  MESSAGE_ERROR_CONFLICT_VERIFICATION, 
  MESSAGE_ERROR_VERIFICATION_FAIL, 
  MESSAGE_ERROR_AUTH_FAIL, 
  MESSAGE_ERROR_DATABASE, 
  MESSAGE_ERROR_ROLE_UNAUTHORIZED, 
  MESSAGE_ERROR_NOT_FOUND, 
  MESSAGE_ERROR_CREDENTIALS,
  MESSAGE_ERROR_USER_UNAPPROVED 
} from "../constants/messages";

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

const loginAuthentication = ({ passport, UserModel, RegistrationModel }) => {
  passport.use(PASSPORT_LOGIN, new LocalStrategy({ session: false }, async (username, password, done) => {
    try {
      const unapprovedUser = await RegistrationModel.findOne({ username, password });
    
      if(unapprovedUser) return done({ general: MESSAGE_ERROR_USER_UNAPPROVED });

      UserModel.authenticate()(username, password, (error, result) => {
        if(error) {
          done(error);
        } else {
          result ? done(null, result) : done(null, false, { message: MESSAGE_ERROR_CREDENTIALS });
        }
      });
    } catch(error) {
      done(error);
    }
  }));
};

/**
 * Passport authentication for Register. Receives a username, password, name, and email from the user's request.
 * 
 * Checks the database for existing `username` and `email`. Usernames and emails must be unique.
 */
const registerAuthentication = ({ passport, UserModel, RegistrationModel }) => {
  passport.use(PASSPORT_REGISTER, new LocalStrategy({ passReqToCallback: true, session: false }, async (req, username, password, done) => {
    const newUser = req.body;
    const { email } = newUser;

    const validatedUsername = usernameValidator(username);
    const validatedEmail = emailValidator(email);
    const validatedPassword = passwordValidator(password);

    let error;

    if(!validatedUsername.valid) {
      error = { username: validatedUsername.error };
    } else if(!validatedEmail.valid) {
      error = { ...error, email: validatedEmail.error };
    } else if(!validatedPassword.valid) {
      error = { ...error, password: validatedPassword.error };
    }

    if(!error) {
      try {
        // Check for conflicts
        const registeredUsersConflicts = await UserModel.find({ $or: [ { username }, { email }] });
        const unapprovedRegisteredUsersConflicts = await RegistrationModel.find({ $or: [ { username }, { email }] });

        const validatedRegisteredUsersConflicts = existingUsersValidator(registeredUsersConflicts, username, email);
        const validatedUnapprovedRegisteredUsersConflicts = existingUsersValidator(unapprovedRegisteredUsersConflicts, username, email);

        if(!validatedRegisteredUsersConflicts.valid || !validatedUnapprovedRegisteredUsersConflicts.valid) {
          done({ ...validatedRegisteredUsersConflicts.error, ...validatedUnapprovedRegisteredUsersConflicts.error });
        } else {
          done(null, newUser);
        }
      } catch(error) {
        done(error);
      }
    } else {
      done(error);
    }
  }));
};

export const verificationMiddleware = ({ UserModel, RegistrationModel, RegisterVerificationModel }) => async (req, res, next) => {
  const urlPaths = req.path.split("/");

  if(urlPaths.length === 3) {
    let _id = urlPaths[2];

    try {
      if(!isValidMongooseObjectId(_id)) return res.status(HTTP_ERROR_NOT_FOUND).json({ message: MESSAGE_ERROR_NOT_FOUND });

      const userToVerify = await RegisterVerificationModel.findById(_id);

      if(!userToVerify) return res.status(HTTP_ERROR_NOT_FOUND).json({ message: MESSAGE_ERROR_VERIFICATION_FAIL });
      
      const { username, email } = userToVerify;

      const registeredUsersConflicts = await UserModel.find({ $or: [ { username }, { email }] });
      const unapprovedRegisteredUsersConflicts = await RegistrationModel.find({ $or: [ { username }, { email }] });

      const validatedRegisteredUsersConflicts = existingUsersValidator(registeredUsersConflicts, username, email);
      const validatedUnapprovedRegisteredUsersConflicts = existingUsersValidator(unapprovedRegisteredUsersConflicts, username, email);

      if(!validatedRegisteredUsersConflicts.valid || !validatedUnapprovedRegisteredUsersConflicts.valid) {
        res.status(HTTP_ERROR_CONFLICT).json({ message: MESSAGE_ERROR_CONFLICT_VERIFICATION, error: { ...validatedRegisteredUsersConflicts.error, ...validatedUnapprovedRegisteredUsersConflicts.error } });
      } else {
        res.locals.newUser = userToVerify.toObject();
        next();
      }
    } catch(error) {
      res.status(HTTP_ERROR_DATABASE).json({ message: MESSAGE_ERROR_DATABASE, error });
    }
  } else {
    res.status(HTTP_ERROR_NOT_FOUND).end();
  }
};

/**
 * Authentication middleware which checks for valid tokens
 */
export const userAuthenticationMiddleware = ({ passport }) => (req, res, next) => {
  passport.authenticate(PASSPORT_JWT, { session: false }, (error, user, info) => {
    if(error) {
      console.error(MESSAGE_ERROR_DATABASE, error);
      res.status(HTTP_ERROR_DATABASE).json({ message: MESSAGE_ERROR_DATABASE, error });
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
  const { user } = res.locals;
  const { roles } = user;

  const roleData = roles[role];

  const { scope, sectors, LHINs, organizations } = roleData;

  const filter = calculateRoleFilter({ scope, sectors, LHINs, organizations });

  if(scope === ROLE_LEVEL_NOT_APPLICABLE) {
    res.status(HTTP_ERROR_UNAUTHORIZED).json({ message: MESSAGE_ERROR_ROLE_UNAUTHORIZED });
  } else {
    res.locals = { user, roleData, filter };
    next();
  }
};

/**
 * Admin middlewares - Validates roles before passing to routes performing role actions.
 */
export const userRoleMiddleware = () => (req, res, next) => adminRoleMiddleware(req, res, next, ROLE_USER_MANAGER);

export const organizationRoleMiddleware = () => (req, res, next) => adminRoleMiddleware(req, res, next, ROLE_ORGANIZATION_MANAGER);

export const sectorRoleMiddleware = () => (req, res, next) => adminRoleMiddleware(req, res, next, ROLE_SECTOR_MANAGER);

// export const templateRoleMiddleware = () => adminRoleMiddleware(ROLE_TEMPLATE_MANAGER)

// export const packageRoleMiddleware = () => adminRoleMiddleware(ROLE_PACKAGE_MANAGER);

// TODO : Handle other errors. Currently assumes database error occured previously.
// Final errors route. To be used for handling errors that occur at the end of the router stack.
export const generalErrorHandler = () => (error, _req, res, _next) => {
  console.error("General error handler: ", error);
  res.status(HTTP_ERROR_DATABASE).json({ message: MESSAGE_ERROR_DATABASE, error });
};

const setupAuthentication = (helpers) => {
  try {
    console.log("Auth: Setting up authentication");

    userAuthentication(helpers);
    loginAuthentication(helpers);
    registerAuthentication(helpers);
    
    console.log("Auth: Successfully set up authentication");
  } catch(error) {
    console.error("Auth: Failed to set up authentication");
  }
};

export default setupAuthentication;