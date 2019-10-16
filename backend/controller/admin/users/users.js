import { ROUTE_POST_USERS, HTTP_ERROR_DATABASE } from "../../../constants/rest";

// How to have pagination?
// UserModel.estimateDocumentCount();
// https://itnext.io/back-end-pagination-with-nodejs-expressjs-mongodb-mongoose-ejs-3566994356e0
const users = ({ router, UserModel }) => {
  router.post(ROUTE_POST_USERS, (_req, res) => {
    UserModel.find({})
      .then((users) => res.json({ message: "Successfully fetched users", data: { users } }))
      .catch((error) => res.status(HTTP_ERROR_DATABASE).json({ message: "Failed to fetch users", error }));
  });
};

export default users;