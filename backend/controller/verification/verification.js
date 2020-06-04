import { ROUTE_VERFICATION , ROUTE_DATA} from "../../constants/rest";
import {
  MESSAGE_SUCCESS_ORGANIZATIONS,
  MESSAGE_SUCCESS_REGISTRATION,
  MESSAGE_SUCCESS_VERIFICATION
} from "../../constants/messages";
import {sendUserActiveEmail, sendUserRejectEmail} from "../../setup/mail";

const verification = ({ router, UserModel,OrganizationModel }) => {
  // ? For now, the secrete code for verification is the mongodb entry id
  // TODO : The authentication and this route doesn't really make sense (authentication uses the params id, but this route doesn't)... leave it for now
  // TODO! : Change id to something more secure


};

export default verification;