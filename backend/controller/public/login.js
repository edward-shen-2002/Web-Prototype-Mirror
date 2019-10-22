import { generateToken } from "../../tools/jwt";

import { PASSPORT_LOGIN } from "../../constants/passport";
import { ROUTE_LOGIN } from "../../constants/rest";

import { MESSAGE_SUCCESS_LOGIN, MESSAGE_ERROR_CREDENTIALS } from "../../constants/rest";

const login = ({ router, passport }) => {
  router.post(ROUTE_LOGIN, (req, res, next) => {
    passport.authenticate(PASSPORT_LOGIN, (error, user, info) => {
      if(error) {
        next(error);
      } else if(user) {
        user.hash = undefined;
        user.salt = undefined;
        
        const token = generateToken(user.username);

        res.json({ message: MESSAGE_SUCCESS_LOGIN, data: { token, user } });
      } else {
        console.error(info);
        res.status(401).json({ message: MESSAGE_ERROR_CREDENTIALS, details: info });
      }
    })(req, res, next);
  });
};

export default login;