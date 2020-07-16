import { Service } from 'typedi';
import { Router } from 'express';
import AuthService from '../../services/Auth';

const AuthController = Service([AuthService], service => {
  const router = Router();
  return (() => {
    router.get('/logout', service.logout);
    router.get('/auth/:method', service.authenticate);
    router.get('/auth/:method/callback', service.authenticateCallback);
    router.get('/auto', service.auto);

    return router;
  })();
});

export default AuthController;
