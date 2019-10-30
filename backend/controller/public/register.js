import nodemailer from "nodemailer";

import { PASSPORT_REGISTER } from "../../constants/passport";
import { ROUTE_REGISTER } from "../../constants/rest";
import { MESSAGE_SUCCESS_REGISTRATION } from "../../constants/messages";

const register = ({ router, passport, RegisterVerificationModel }) => {
  router.post(ROUTE_REGISTER, (req, res, next) => {

    passport.authenticate(PASSPORT_REGISTER, (error, user) => {
      if(error) {
        console.error(error);
        next(error);
      } else {
        console.log("Reached")
        // generate code to verify user
        RegisterVerificationModel.create({ ...user })
          .then(() => res.json({ message: MESSAGE_SUCCESS_REGISTRATION }))
          .catch(next);
      } 
    })(req, res, next);
  });
};

export default register;