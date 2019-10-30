import { ROUTE_ADMIN_USERS } from "../../../constants/rest";

import { 
  MESSAGE_SUCCESS_USERS, 
  MESSAGE_SUCCESS_USERS_CREATE,
  MESSAGE_SUCCESS_USERS_UPDATE,
  MESSAGE_SUCCESS_USERS_DELETE 
} from "../../../constants/messages";

import { ROLE_LEVEL_ADMIN, ROLE_LEVEL_LHIN, ROLE_LEVEL_ORGANIZATION } from "../../../constants/roles";

const organizationsFilter = (organizations) => organizations.map((organization) => {
  let _filter = {};

  _filter[`organizations.${organization}`] = { $exists: true };

  return _filter;
});

const LHINsFilter = (LHINs) => LHINs.map((LHIN) => {
  let _filter = {};

  _filter[`LHINs.${LHIN}`] = { $exists: true };

  return _filter;
});

// TODO : Limit scope for put, post, and delete (get is done)
// How to have pagination?
// UserModel.estimateDocumentCount();
// https://itnext.io/back-end-pagination-with-nodejs-expressjs-mongodb-mongoose-ejs-3566994356e0
const users = ({ router, UserModel }) => {
  router.get(ROUTE_ADMIN_USERS, (_req, res, next) => {
    const { roleData } = res.locals;
    let { scope, LHINs, organizations } = roleData;

    let shouldPerformQuery = true;
    let filter;

    if(scope === ROLE_LEVEL_ADMIN) {
      filter = {};
    } else if(scope === ROLE_LEVEL_LHIN) {
      if(LHINs.length || organizations.length) {
        filter = { $or: [ ...LHINsFilter(LHINs), ...organizationsFilter(organizations) ] };
      } else {
        shouldPerformQuery = false;
      }
    } else {
      if(organizations.length) {
        filter = { $or: [ ...organizationsFilter(organizations) ] };
      } else {
        shouldPerformQuery = false;
      }
    }

    // ?Minor edge case where user is a LHIN/organization admin but has no scope... should this happen?
    if(shouldPerformQuery) {
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
      .then(() => res.json({ message: MESSAGE_SUCCESS_USERS_CREATE }))
      .catch(next);
  });

  // TODO : Check user contents, individually extract the required information from the req.body since it's possibly that this new user can have super powers
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

  // ? Should this be delete or change user to inactive?
  router.delete(`${ROUTE_ADMIN_USERS}/:username`, (req, res, next) => {
    const { username } = req.params;

    UserModel.deleteOne({ username })
      .then(() => res.json({ message: MESSAGE_SUCCESS_USERS_DELETE }))
      .catch(next);
  });
};

export default users;