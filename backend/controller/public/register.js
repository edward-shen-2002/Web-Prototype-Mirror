import { generateToken } from "../../tools/jwt";

import { PASSPORT_REGISTER } from "../../constants/passport";
import { ROUTE_REGISTER, HTTP_ERROR_CONFLICT, MESSAGE_ERROR_DATABASE, MESSAGE_SUCCESS_REGISTRATION } from "../../constants/rest";

const register = ({ router, passport }) => {
  router.post(ROUTE_REGISTER, (req, res) => {
    passport.authenticate(PASSPORT_REGISTER, (error, user, info) => {
      if(error) {
        console.log(error);
        res.status(HTTP_ERROR_CONFLICT).json({ message: MESSAGE_ERROR_DATABASE, details: error });
      } else {
        const token = generateToken(user.username);
        res.json({ message: MESSAGE_SUCCESS_REGISTRATION, data: { user, token } });
      } 
    })(req, res);
  });
};

export default register;