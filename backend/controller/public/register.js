import { PASSPORT_REGISTER } from "../../constants/passport";
import { ROUTE_REGISTER } from "../../constants/rest";
import { MESSAGE_SUCCESS_REGISTRATION } from "../../constants/messages";
import { sendVerficationEmail } from "../../setup/mail";

const register = ({ router, passport, RegisterVerificationModel }) => {
  // ? For now, the secrete code for verification is the mongodb entry id
  // TODO : Change id to something more secure
  // TODO : Send an html email to the user, which contains the id and user for verification
  router.post(ROUTE_REGISTER, (req, res, next) => {
    passport.authenticate(PASSPORT_REGISTER, (error, user) => {
      if(error) {
        next(error);
      } else {
        RegisterVerificationModel.create({ ...user })
          .then(({ _id }) => {
            const { username, email } = user;
            sendVerficationEmail(_id, username, email)
              .then(({ message }) => {
                console.log(message);
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