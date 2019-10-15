import { generateToken } from "../tools/jwt";

import { PASSPORT_REGISTER } from "../constants/passport";
import { ROUTE_POST_REGISTER } from "../constants/rest";

const register = ({ router, passport }) => {
  router.post(ROUTE_POST_REGISTER, (req, res) => {
    passport.authenticate(PASSPORT_REGISTER, (error, user) => {
      if(error) {
        console.log(error);
        res.status(409).json({ message: "Database error", details: error });
      } else {

        const token = generateToken(user.username);
        res.json({ message: "Successfully registered", data: { user, token } });
      } 
    })(req, res);
  });
};

export default register;