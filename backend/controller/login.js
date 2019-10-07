import { PASSPORT_LOGIN, ROUTE_POST_LOGIN } from "../config/constants";

const login = ({ router, passport }) => {
  router.post(ROUTE_POST_LOGIN, (req, res) => {
    passport.authenticate(PASSPORT_LOGIN, (error, user, info) => {
      if(error) {
        res.status(500).json({ message: "Database error", details: error });
      } else if(user) {

        // TODO : do not send salt hash!!!
        // TODO : generate jwt token
        res.json({ message: "Successfully logged in", data: user });
      } else {
        res.status(401).json({ message: "Authentication error", details: info });
      }
    })(req, res);
  });
};

export default login;