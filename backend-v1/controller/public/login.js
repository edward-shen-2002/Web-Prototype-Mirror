import { generateToken } from "../../tools/jwt";

import { PASSPORT_LOGIN } from "../../constants/passport";
import { ROUTE_LOGIN, HTTP_ERROR_AUTH_FAIL, HTTP_ERROR_UNAUTHORIZED } from "../../constants/rest";

import { MESSAGE_SUCCESS_LOGIN, MESSAGE_ERROR_CREDENTIALS } from "../../constants/messages";

const login = ({ router, passport }) => {
  router.post(ROUTE_LOGIN, (req, res, next) => {
    passport.authenticate(PASSPORT_LOGIN, (error, user, info) => {
      if(error) {
        if(error.general) {
          res.status(HTTP_ERROR_UNAUTHORIZED).json({ message: error.general });
        } else {
          next(error);
        }
      } else if(user) {
        user.hash = undefined;
        user.salt = undefined;
        
        const token = generateToken(user.username);

        res.json({ message: MESSAGE_SUCCESS_LOGIN, data: { token, user } });
      } else {
        console.error(info);
        res.status(HTTP_ERROR_AUTH_FAIL).json({ message: MESSAGE_ERROR_CREDENTIALS, error: info });
      }
    })(req, res, next);
  });
};

export default login;