import Container, { Service } from 'typedi';
import { Router } from 'express';
import passport from 'passport';
import os from 'os';
import AuthService from '../../services/Auth';
import Auth from '../../interceptors';

const AuthController = Service([AuthService], (service) => {
  const router = Router();

  // const getToken = (id) => {
  //   return jwt.sign({ id }, process.env.JWT_SECRET, {
  //     expiresIn: process.env.JWT_EXPIRES_IN,
  //   });
  // };

  const authenticatedData = (user, code, res) => {
    const token = getToken(user._id);

    const cookieOptions = {
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
      ),
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
    router.post('/register', (req, res, next) => {
      service
        .processSignUp(req.body)
        .then((user) => res.json({ user }))
        .catch(next);
    });

    router.post('/login', (req, res, next) => {
      console.log('hm: ', req.headers);
      res.redirect('/auth/local/callback');
      // service
      //   .processLogIn(req.body)
      //   .then((user) => {
      //     authenticatedData(user, 200, res);
      //   })
      //   .catch(next);
    });

    router.get('/logout', (req, res, next) => {
      req.logout();
      res.status(200).json({
        status: 'success',
      });
    });

    router.get('/google', (req, res) => {
      var method = req.params.method;
      console.log(method);
      passport.authenticate('google', { scope: 'email' })(req, res);
    });
    router.get('/facebook', (req, res) => {
      var method = req.params.method;
      console.log(method);
      passport.authenticate('facebook', { scope: 'email' })(req, res);
    });
    router.get('/:method/callback', (req, res, next) => {
      var method = req.params.method;
      console.log('method:', method);
      passport.authenticate(method, {
        successRedirect: 'http://localhost:3003/', //redirect to home page
        failureRedirect: 'http://localhost:3003/auth/error', //redirect to error page
      })(req, res, next);
    });

    router.get('/auto', (req, res) => {
      service.processAuto().then((user) => {
        const uname = os.userInfo().username;
        user.forEach((obj) => {
          res.send(obj.username === uname);
        });
      });
    });

    router.get(
      '/profile',
      Container.get(Auth).authenticated,
      (req, res, next) => {
        res.json({
          status: 'success',
        });
      }
    );

    return router;
  })();
});

export default AuthController;
