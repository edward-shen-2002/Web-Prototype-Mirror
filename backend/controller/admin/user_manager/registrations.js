import { ROUTE_ADMIN_REGISTRATIONS, HTTP_ERROR_NOT_FOUND } from "../../../constants/rest";

// import { ROLE_LEVEL_ADMIN, ROLE_LEVEL_LHIN } from "../../../constants/roles";

import { 
  MESSAGE_SUCCESS_USERS,
  MESSAGE_SUCCESS_USERS_CREATE,
  MESSAGE_SUCCESS_USERS_UPDATE,
  MESSAGE_SUCCESS_USERS_DELETE, 

  MESSAGE_SUCCESS_APPROVE, 

  MESSAGE_ERROR_NOT_FOUND 
} from "../../../constants/messages";

import { isValidMongooseObjectId } from "../../../tools/misc";

const registration = ({ router, UserModel, RegistrationModel }) => {
  router.get(ROUTE_ADMIN_REGISTRATIONS, (_req, res, next) => {
    const { filter } = res.locals;

    // ?Minor edge case where user is a LHIN/organization admin but has no scope... should this happen?
    if(filter) {
      RegistrationModel.find(filter)
        .then((users) => res.json({ message: MESSAGE_SUCCESS_USERS, data: { users } }))
        .catch(next);
    } else {
      res.json({ message: MESSAGE_SUCCESS_USERS, data: { users: [] } });
    }
  });

  // TODO : Check user contents, individually extract the required information from the req.body since it's possibly that this new user can have super powers
  router.post(ROUTE_ADMIN_REGISTRATIONS, (req, res, next) => {
    const { newUser } = req.body;
    const { password } = newUser;

    RegistrationModel.register({ ...newUser, password: undefined }, password)
      .then((user) => res.json({ message: MESSAGE_SUCCESS_USERS_CREATE, data: { user } }))
      .catch(next);
  });

  // TODO : Check for conflicts
  router.put(ROUTE_ADMIN_REGISTRATIONS, (req, res, next) => {
    const { updatedUser } = req.body;
    const { _id } = updatedUser;

    RegistrationModel.findByIdAndUpdate(_id, updatedUser)
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

  router.delete(`${ROUTE_ADMIN_REGISTRATIONS}/:_id`, (req, res, next) => {
    const { _id } = req.params;

    if(!isValidMongooseObjectId(_id)) return res.status(HTTP_ERROR_NOT_FOUND).json({ message: MESSAGE_ERROR_NOT_FOUND });

    RegistrationModel.findByIdAndRemove(_id)
      .then(() => res.json({ message: MESSAGE_SUCCESS_USERS_DELETE }))
      .catch(next);
  });

  // TODO : validate user data - ensure that the user admin has the scope and can only edit within his/her scope/capabilities
  // ! Roles is a bit difficult to do check, assume user admin can do anything for now, ... but should be changed!!
  router.post(`${ROUTE_ADMIN_REGISTRATIONS}/approve/:_id`, async (req, res, next) => {
    const { _id } = req.params;
    
    if(!isValidMongooseObjectId(_id)) return res.status(HTTP_ERROR_NOT_FOUND).json({ message: MESSAGE_ERROR_NOT_FOUND });

    try {
      const registeredUserDocument = await RegistrationModel.findById(_id);

      await UserModel.create({ ...registeredUserDocument.toObject(), _id: undefined });
      await RegistrationModel.findByIdAndRemove(_id);

      res.json({ message: MESSAGE_SUCCESS_APPROVE });
    } catch(error) {
      next(error);
    }
  });
};

export default registration;