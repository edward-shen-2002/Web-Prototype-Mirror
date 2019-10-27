import { generateToken } from "../../tools/jwt";

import { PASSPORT_REGISTER } from "../../constants/passport";
import { ROUTE_REGISTER, MESSAGE_SUCCESS_REGISTRATION } from "../../constants/rest";

const register = ({ router, passport }) => {
  router.post(ROUTE_REGISTER, (req, res, next) => {
    passport.authenticate(PASSPORT_REGISTER, (error, user) => {
      if(error) {
        next(error);
      } else {
        const token = generateToken(user.username);

        res.json({ message: MESSAGE_SUCCESS_REGISTRATION, data: { user, token } });
      } 
    })(req, res, next);
  });
};

export default register;