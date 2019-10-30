import nodemailer from "nodemailer";

import { PASSPORT_REGISTER } from "../../constants/passport";
import { ROUTE_REGISTER } from "../../constants/rest";
import { MESSAGE_SUCCESS_REGISTRATION } from "../../constants/messages";

const register = ({ router, passport }) => {
  router.post(ROUTE_REGISTER, (req, res, next) => {

    passport.authenticate(PASSPORT_REGISTER, (error, user) => {
      if(error) {
        next(error);
      } else {
        res.json({ message: MESSAGE_SUCCESS_REGISTRATION });
      } 
    })(req, res, next);
  });
};

export default register;