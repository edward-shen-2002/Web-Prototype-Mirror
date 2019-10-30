import { PASSPORT_VERIFICATION } from "../../constants/passport";
import { ROUTE_VERFICATION } from "../../constants/rest";
import { MESSAGE_SUCCESS_VERIFICATION } from "../../constants/messages";

const verification = ({ router, passport, UserModel, RegistrationModel, RegisterVerificationModel }) => {
  // ? For now, the secrete code for verification is the mongodb entry id
  // TODO : Change id to something more secure
  // TODO : Send an html email to the user, which contains the id and user for verification
  router.get(`${ROUTE_VERFICATION}/:id`, async (req, res, next) => {
    const { newUser } = res.locals;

    try { 
      await RegistrationModel.create({ ...newUser, _id: undefined })
      await RegisterVerificationModel.findByIdAndRemove(newUser._id);
      res.json({ message: MESSAGE_SUCCESS_VERIFICATION });
    } catch(error) {
      next(error);
    }
    
  });
};

export default verification;