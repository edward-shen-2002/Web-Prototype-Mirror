import { isValidMongooseObjectId } from "../../../tools/misc";

import { ROUTE_ADMIN_USERS, HTTP_ERROR_NOT_FOUND } from "../../../constants/rest";

import { 
  MESSAGE_SUCCESS_USERS, 
  MESSAGE_SUCCESS_USERS_CREATE,
  MESSAGE_SUCCESS_USERS_UPDATE,
  MESSAGE_SUCCESS_USERS_DELETE, 

  MESSAGE_ERROR_NOT_FOUND
} from "../../../constants/messages";

// import { ROLE_LEVEL_ADMIN, ROLE_LEVEL_LHIN, ROLE_LEVEL_ORGANIZATION } from "../../../constants/roles";

// TODO : Limit scope for put, post, and delete (get is done)
// How to have pagination?
// UserModel.estimateDocumentCount();
// https://itnext.io/back-end-pagination-with-nodejs-expressjs-mongodb-mongoose-ejs-3566994356e0
const users = ({ router, UserModel }) => {
  router.get(ROUTE_ADMIN_USERS, (_req, res, next) => {
    const { filter } = res.locals;

    // ?Minor edge case where user is a LHIN/organization admin but has no scope... should this happen?
    if(filter) {
      UserModel.find(filter)
        .then((users) => res.json({ message: MESSAGE_SUCCESS_USERS, data: { users } }))
        .catch(next);
    } else {
      res.json({ message: MESSAGE_SUCCESS_USERS, data: { users: [] } });
    }
  });

  // TODO : Check user contents, individually extract the required information from the req.body since it's possibly that this new user can have super powers
  router.post(ROUTE_ADMIN_USERS, (req, res, next) => {
    const { newUser } = req.body;
    const { password } = newUser;

    UserModel.register({ ...newUser, password: undefined }, password)
      .then((user) => res.json({ message: MESSAGE_SUCCESS_USERS_CREATE, data: { user } }))
      .catch(next);
  });

  // TODO : Check user contents, individually extract the required information from the req.body since it's possibly that this new user can have super powers
  router.put(ROUTE_ADMIN_USERS, (req, res, next) => {
    const { updatedUser } = req.body;
    const { _id } = updatedUser;

    UserModel.findByIdAndUpdate(_id, updatedUser)
      .then(async (user) => {
        const newPassword = updatedUser.password;

        if(newPassword) {
          await user.setPassword(newPassword);
          await user.save();
        }

        res.json({ message: MESSAGE_SUCCESS_USERS_UPDATE });
      })
      .catch(next)
  });

  // ? Should this be delete or change user to inactive? Change to id?
  router.delete(`${ROUTE_ADMIN_USERS}/:_id`, (req, res, next) => {
    const { _id } = req.params;

    if(!isValidMongooseObjectId(_id)) return res.status(HTTP_ERROR_NOT_FOUND).json({ message: MESSAGE_ERROR_NOT_FOUND });

    UserModel.findByIdAndRemove(_id)
      .then(() => res.json({ message: MESSAGE_SUCCESS_USERS_DELETE }))
      .catch(next);
  });
};

export default users;