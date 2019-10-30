import { ROUTE_LOGOUT } from "../../constants/rest";
import { MESSAGE_SUCCESS_LOGOUT } from "../../constants/messages";

const logout = ({ router }) => {
  router.post(ROUTE_LOGOUT, (_req, res) => {
    // TODO : Blacklist jwt token
    res.json({ message: MESSAGE_SUCCESS_LOGOUT });
  }); 
};

export default logout;