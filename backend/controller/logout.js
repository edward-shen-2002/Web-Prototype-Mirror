import { ROUTE_POST_LOGOUT } from "../constants/rest";

const logout = ({ router }) => {
  router.post(ROUTE_POST_LOGOUT, (_req, res) => {
    // TODO : Blacklist jwt token
    res.json({ message: "Successfully logged out" });
  }); 
};

export default logout;