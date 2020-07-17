import { Service } from 'typedi';
import { Router } from 'express';
import AuthService from '../../services/Auth';
import auth from '../../interceptors/passportAuth';

const AuthController = Service([AuthService], service => {
  const router = Router();
  return (() => {
    router.get('/logout', service.logout);
    router.get('/auth/:method', service.authenticate);
    router.get('/auth/:method/callback', service.authenticateCallback);
    router.get('/auto', service.auto);
    // POST new user route (optional, everyone has access)
    router.post('/register', auth.optional, service.createUser);

    // POST login route (optional, everyone has access)
    router.post('/login', auth.optional, service.processLogin);
    return router;
  })();
});

export default AuthController;
