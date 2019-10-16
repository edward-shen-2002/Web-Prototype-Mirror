import { generateToken } from "../../tools/jwt";

import { PASSPORT_LOGIN } from "../../constants/passport";
import { ROUTE_POST_LOGIN } from "../../constants/rest";

const login = ({ router, passport }) => {
  router.post(ROUTE_POST_LOGIN, (req, res) => {
    passport.authenticate(PASSPORT_LOGIN, (error, user, info) => {
      if(error) {
        console.log(error);
        res.status(500).json({ message: "Database error", details: error });
      } else if(user) {
        user.hash = undefined;
        user.salt = undefined;
        
        const token = generateToken(user.username);

        res.json({ message: "Successfully logged in", data: { token, user } });
      } else {
        res.status(401).json({ message: "Authentication error", details: info });
      }
    })(req, res);
  });
};

export default login;