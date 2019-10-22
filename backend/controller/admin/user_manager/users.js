import { ROUTE_ADMIN_USERS, ROUTE_ADMIN_USERS_DELETE, MESSAGE_SUCCESS_USERS, MESSAGE_SUCCESS_USERS_DELETE } from "../../../constants/rest";

// How to have pagination?
// UserModel.estimateDocumentCount();
// https://itnext.io/back-end-pagination-with-nodejs-expressjs-mongodb-mongoose-ejs-3566994356e0
const users = ({ router, UserModel }) => {
  router.get(ROUTE_ADMIN_USERS, (_req, res, next) => {
    UserModel.find({})
      .then((users) => res.json({ message: MESSAGE_SUCCESS_USERS, data: { users } }))
      .catch(next);
  });

  router.delete(ROUTE_ADMIN_USERS_DELETE, (req, res, next) => {
    const { username } = req.body;
    UserModel.deleteOne({ username })
      .then(() => res.json({ message: MESSAGE_SUCCESS_USERS_DELETE }))
      .catch(next);
  });
};

export default users;