import { PASSPORT_VERIFICATION } from "../../constants/passport";
import { ROUTE_VERFICATION } from "../../constants/rest";
import { MESSAGE_SUCCESS_VERIFICATION } from "../../constants/messages";

const verification = ({ router, RegistrationModel, RegisterVerificationModel }) => {
  // ? For now, the secrete code for verification is the mongodb entry id
  // TODO : The authentication and this route doesn't really make sense (authentication uses the params id, but this route doesn't)... leave it for now
  // TODO! : Change id to something more secure
  router.get(`${ROUTE_VERFICATION}/:id`, async (req, res, next) => {
    const { newUser } = res.locals;
    const { username, email, _id } = newUser;

    try { 
      await RegistrationModel.create({ ...newUser, _id: undefined })
      await RegisterVerificationModel.remove({ $or: [ { _id }, { username }, { email } ] });

      res.json({ message: MESSAGE_SUCCESS_VERIFICATION });
    } catch(error) {
      next(error);
    }
    
  });
};

export default verification;