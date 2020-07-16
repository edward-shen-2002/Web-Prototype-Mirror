import { Service } from 'typedi';
import { Router } from 'express';
import UserService from '../../services/User';

const UserController = Service([UserService], service => {
  const router = Router();

  return (function () {
    router.get(`/users/registerUser`, req => {
      const { registerData } = req.body;
      service.register(registerData);
    });

    router.get(`/users/verifyUser`, req => {
      const { approve, _id, hashedUsername, orgId } = req.query;
      console.log(hashedUsername);
      service.sendActiveEmail(approve, _id, orgId);
    });

    router.get(`/users/activeUser`, req => {
      const { _id, hashedUsername } = req.query;
      console.log(hashedUsername);
      service.activeUser(_id);
    });

    return router;
  })();
});

export default UserController;
