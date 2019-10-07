import { PASSPORT_REGISTER, ROUTE_POST_REGISTER } from "../config/constants";

const register = ({ router, passport }) => {
  router.post(ROUTE_POST_REGISTER, (req, res) => {
    passport.authenticate(PASSPORT_REGISTER, (error, user) => {
      if(error) {
        console.log(error);
        res.status(409).json({ message: "Database error", details: error });
      } else {

        // TODO : do not send salt hash!!!
        // TODO : generate jwt token
        res.json({ message: "Successfully registered", data: user });
      } 
    })(req, res);
  });
};

export default register;