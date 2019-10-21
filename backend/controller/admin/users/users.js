import { ROUTE_ADMIN_USERS, HTTP_ERROR_DATABASE, ROUTE_ADMIN_USERS_DELETE, MESSAGE_SUCCESS_USERS, MESSAGE_SUCCESS_USERS_DELETE, MESSAGE_ERROR_DATABASE } from "../../../constants/rest";

// How to have pagination?
// UserModel.estimateDocumentCount();
// https://itnext.io/back-end-pagination-with-nodejs-expressjs-mongodb-mongoose-ejs-3566994356e0
const users = ({ router, UserModel }) => {
  router.post(ROUTE_ADMIN_USERS, (_req, res) => {
    UserModel.find({})
      .then((users) => res.json({ message: MESSAGE_SUCCESS_USERS, data: { users } }))
      .catch((error) => res.status(HTTP_ERROR_DATABASE).json({ message: MESSAGE_ERROR_DATABASE, error }));
  });

  router.delete(ROUTE_ADMIN_USERS_DELETE, (req, res) => {
    const { username } = req.body;
    UserModel.deleteOne({ username })
      .then((user) => {
        res.json({ message: MESSAGE_SUCCESS_USERS_DELETE });
      })
      .catch((error) => {
        console.error(MESSAGE_ERROR_DATABASE, error);
        res.status(MESSAGE_ERROR_DATABASE).json({ message: MESSAGE_ERROR_DATABASE });
      });
  });
};

export default users;