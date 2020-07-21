import passport from 'passport';
import mongoose from 'mongoose';
import os from 'os';
import UserModel from '../../models/User/model';
import { addTokenToCookie } from '../../middlewares/shared';

export default class ProgramService {
  authenticate(req, res, next) {
    const { method } = req.params;
    passport.authenticate(method, { scope: 'email' })(req, res, next);
  }

  authenticateCallback = (req, res, next) => {
    const { method } = req.params;
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3003');
    passport.authenticate(method, {
      successRedirect: 'http://localhost:3003/', // redirect to home page
      failureRedirect: 'http://localhost:3003/auth/error', // redirect to error page
    })(req, res, next);
  }

  logout = (req, res) => {
    req.logout();
    res.cookie('token', '').json({
      status: 'ok',
    });
  }

  auto = (req, res) => {
    var temp = mongoose.Types.ObjectId('5efb8b638464c20f646049a6');
    var uname = os.userInfo().username;
    UserModel.find({ AppConfig: temp }, function (err, user1) {
      var found = false;
      user1.forEach((obj) => {
        if (obj.username === uname) {
          found = true;
          req.session.user = user1
          res.send(true);
        }
      });
      if (!found) {
        res.send(false);
      }
    });
  };

  profile(req, res){
    if (req.user.token !== null) {
      res.json({ status: "success" })
    } else {
      res.json({ status: "fail" })
    }
  }

  createUser(req, res) {
    const {
      body: { email, password, firstName, lastName, username, title, phoneNumber, ext, sysRoles },
    } = req;

    if (!email) {
      return res.status(422).json({
        errors: {
          email: 'is required',
        },
      });
    }

    if (!password) {
      return res.status(422).json({
        errors: {
          password: 'is required',
        },
      });
    }

    const finalUser = new UserModel({
      username,
      email,
      password,
    });

    finalUser.setHashedPassword(password);

    return finalUser
      .save()
      .then(user => {
        const token = user.generateJWT();
        addTokenToCookie(res, token);
        res.json({ user: user.returnAuthUserJson(token) });
      })
      .catch(err => res.json({ error: err }));
  }

  processLogin(req, res, next) {
    const {
      body: { email, password },
    } = req;
    console.log(req.body);
    if (!email) {
      return res.status(422).json({
        errors: {
          email: 'is required',
        },
      });
    }

    if (!password) {
      return res.status(422).json({
        errors: {
          password: 'is required',
        },
      });
    }

    return passport.authenticate(['local', 'google', 'facebook'], { session: false }, (err, passportUser, info) => {
      console.log('info:', info);
      if (err) {
        return next(err);
      }

      if (passportUser) {
        const authUser = passportUser;
        const token = passportUser.generateJWT();
        addTokenToCookie(res, token);
        return res.json({ user: authUser.returnAuthUserJson(token) });
      }

      return res.status(400).info;
    })(req, res, next);
  }
}
