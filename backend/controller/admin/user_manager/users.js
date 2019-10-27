import { ROUTE_ADMIN_USERS, MESSAGE_SUCCESS_USERS, MESSAGE_SUCCESS_USERS_DELETE } from "../../../constants/rest";

// How to have pagination?
// UserModel.estimateDocumentCount();
// https://itnext.io/back-end-pagination-with-nodejs-expressjs-mongodb-mongoose-ejs-3566994356e0
const users = ({ router, UserModel }) => {
  // TODO : validate new user entry
  router.post(ROUTE_ADMIN_USERS, (req, res, next) => {
    const { newUser } = req.body;
    const { password } = newUser;

    newUser.password = undefined;

    UserModel.register(newUser, password, (error, result) => {
      if(error) {
        res.status(409).json({ message: "Conflict!!" });
      } else if(result) {
        res.json({ message: "Successfully added user" });
      }
    });
  });

  // TODO : validate user entry
  router.put(ROUTE_ADMIN_USERS, (req, res, next) => {
    const { oldUser: { username }, newUser } = req.body;

    UserModel.findOneAndUpdate({ username }, newUser)
      .then(async (user) => {
        const newPassword = newUser.password;
        if(newPassword) {
          await user.setPassword(newPassword);
          await user.save();
        }

        res.json({ message: "Successfully updated user" });
      })
      .catch((error) => res.status(409).json({ message: "An error occured - possible conflict or database failure", error }))
  });

  router.get(ROUTE_ADMIN_USERS, (_req, res, next) => {
    UserModel.find({})
      .then((users) => res.json({ message: MESSAGE_SUCCESS_USERS, data: { users } }))
      .catch(next);
  });

  router.delete(`${ROUTE_ADMIN_USERS}/:username`, (req, res, next) => {
    const { username } = req.params;

    UserModel.deleteOne({ username })
      .then(() => res.json({ message: MESSAGE_SUCCESS_USERS_DELETE }))
      .catch(next);
  });
};

export default users;