import { PASSPORT_VERIFICATION } from "../../constants/passport";
import { ROUTE_VERFICATION } from "../../constants/rest";
import { MESSAGE_SUCCESS_VERIFICATION } from "../../constants/messages";

const verification = ({ router, passport, UserModel, RegistrationModel, RegisterVerificationModel }) => {
  // ? For now, the secrete code for verification is the mongodb entry id
  // TODO : Change id to something more secure
  // TODO : Send an html email to the user, which contains the id and user for verification
  router.get(`${ROUTE_VERFICATION}/:id`, (req, res, next) => {
    res.json({ message: MESSAGE_SUCCESS_VERIFICATION });
    // res.end();
  });
};

export default verification;