import { ROUTE_ADMIN_REGISTRATION, HTTP_ERROR_NOT_FOUND } from "../../../constants/rest";

import { ROLE_LEVEL_ADMIN, ROLE_LEVEL_LHIN } from "../../../constants/roles";

import { MESSAGE_SUCCESS_USERS, MESSAGE_SUCCESS_APPROVE, MESSAGE_ERROR_NOT_FOUND } from "../../../constants/messages";

import { isValidMongooseObjectId } from "../../../tools/misc";

const registration = ({ router, UserModel, RegistrationModel }) => {
  router.get(ROUTE_ADMIN_REGISTRATION, (req, res, next) => {
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
      RegistrationModel.find(filter)
        .then((users) => res.json({ message: MESSAGE_SUCCESS_USERS, data: { users } }))
        .catch(next);
    } else {
      res.json({ message: MESSAGE_SUCCESS_USERS, data: { users: [] } });
    }
  });

  // TODO : validate user data - ensure that the user admin has the scope and can only edit within his/her scope/capabilities
  // ! Roles is a bit difficult to do check, assume user admin can do anything for now, ... but should be changed!!
  router.post(`${ROUTE_ADMIN_REGISTRATION}/approve`, async (req, res, next) => {
    const { roleData, user: adminUser } = res.locals;
    // const { scope } = roleData;

    const { user } = req.body;
    const { _id } = user;

    if(!isValidMongooseObjectId(_id)) return res.status(HTTP_ERROR_NOT_FOUND).json({ message: MESSAGE_ERROR_NOT_FOUND });

    try {
      await UserModel.create({ ...user, _id: undefined });
      await RegistrationModel.findByIdAndRemove(_id);

      res.json({ message: MESSAGE_SUCCESS_APPROVE });
    } catch(error) {
      next(error);
    }
    
    // TODO : Scope later
    // if(scope === ROLE_LEVEL_ADMIN) {

    // } else if(scope === ROLE_LEVEL_LHIN) {
    //   res.status(HTTP_ERROR_UNAUTHORIZED).end();
    // } else {
    //   res.status(HTTP_ERROR_UNAUTHORIZED).end();
    // }
  });
};

export default registration;