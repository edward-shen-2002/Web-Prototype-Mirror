import { 
  ROUTE_ADMIN_USERS, 

  MESSAGE_SUCCESS_USERS, 
  MESSAGE_SUCCESS_USERS_CREATE,
  MESSAGE_SUCCESS_USERS_UPDATE,
  MESSAGE_SUCCESS_USERS_DELETE 
} from "../../../constants/rest";

// How to have pagination?
// UserModel.estimateDocumentCount();
// https://itnext.io/back-end-pagination-with-nodejs-expressjs-mongodb-mongoose-ejs-3566994356e0
const users = ({ router, UserModel }) => {
  router.post(ROUTE_ADMIN_USERS, (req, res, next) => {
    const { newUser } = req.body;
    const { password } = newUser;

    UserModel.register({ ...newUser, password: undefined }, password)
      .then(() => res.json({ message: MESSAGE_SUCCESS_USERS_CREATE }))
      .catch(next);
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

        res.json({ message: MESSAGE_SUCCESS_USERS_UPDATE });
      })
      .catch(next)
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