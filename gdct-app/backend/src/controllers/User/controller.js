import jwt from 'jsonwebtoken';
import Container, { Service } from 'typedi';
import { Router } from 'express';
import UserService from '../../services/User';
import Auth from '../../interceptors';

const UserController = Service([UserService], service => {
  const router = Router();

  const getToken = id => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
  };

  const authenticatedData = (user, code, res) => {
    const token = getToken(user._id);

    const cookieOptions = {
      expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };
    if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;
    res.cookie('jwt', token, cookieOptions);
    user.password = undefined;
    res.status(code).json({
      status: 'success',
      token,
      user,
    });
  };

  return (function () {
    router.get(`/users/registerUser`, (req, res, next) => {
      const { registerData } = req.body;
      service.register(registerData);
    });

    router.get(`/users/verifyUser`, (req, res, next) => {
      const { approve, _id, hashedUsername, orgId } = req.query;
      service.sendActiveEmail(approve, _id, orgId);
    });

    router.get(`/users/activeUser`, (req, res, next) => {
      const { _id, hashedUsername } = req.query;
      service.activeUser(_id);
    });

    router.post('/register', (req, res, next) => {
      service
        .processSignUp(req.body)
        .then(user => res.json({ user }))
        .catch(next);
    });

    router.post('/login', (req, res, next) => {
      service
        .processLogIn(req.body)
        .then(user => {
          authenticatedData(user, 200, res);
        })
        .catch(next);
    });

    router.get('/profile', Container.get(Auth).authenticated, (req, res, next) => {
      res.json({
        status: 'success',
      });
    });

    return router;
  })();
});

export default UserController;
