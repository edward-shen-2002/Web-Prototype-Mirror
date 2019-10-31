import { PASSPORT_REGISTER } from "../../constants/passport";
import { ROUTE_REGISTER, HTTP_ERROR_CONFLICT } from "../../constants/rest";
import { MESSAGE_SUCCESS_REGISTRATION, MESSAGE_ERROR_CONFLICT_PARAMS } from "../../constants/messages";
import { sendVerficationEmail } from "../../setup/mail";

const register = ({ router, passport, RegisterVerificationModel }) => {
  // ? For now, the secrete code for verification is the mongodb entry id
  // TODO : Change id to something more secure
  // TODO : Send an html email to the user, which contains the id and user for verification
  router.post(ROUTE_REGISTER, (req, res, next) => {
    passport.authenticate(PASSPORT_REGISTER, (error, user) => {
      if(error) {
        if(error.username || error.email || error.password) {
          res.status(HTTP_ERROR_CONFLICT).json({ message: MESSAGE_ERROR_CONFLICT_PARAMS, error });
        } else {
          next(error);
        }
      } else {
        RegisterVerificationModel.create({ ...user })
          .then(({ _id }) => {
            const { username, email } = user;
            sendVerficationEmail(_id, username, email)
              .then(({ message }) => {
                res.json({ message: MESSAGE_SUCCESS_REGISTRATION });
              })
              .catch(next);
          })
          .catch(next);
      } 
    })(req, res, next);
  });
};

export default register;