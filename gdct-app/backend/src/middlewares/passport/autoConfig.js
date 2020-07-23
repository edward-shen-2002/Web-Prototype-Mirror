import passportLocal from 'passport-local';
import customStrategy from 'passport-custom'
import passport from 'passport';
import UserModel from '../../models/User/model';
import mongoose from 'mongoose';
import os from 'os';

const CustomStrategy = customStrategy.Strategy;

module.exports = () => {
  passport.use(
    'auto',
    new CustomStrategy(
      function (req, done) {
        process.nextTick(function () {
          var temp = mongoose.Types.ObjectId('5efb8b638464c20f646049a6');
          var uname = os.userInfo().username;
          UserModel.find({ AppConfig: temp }, function (err, user1) {
            user1.forEach((obj) => {
              if (obj.username === uname) {
                obj.generateAuthToken(obj);
                req.session.user = obj
                return done(null, obj);
              } else {
                return done(null, false, { errors: { 'user': 'is invalid' } });
              }
            });

          });
        });
      },
    ),
  );
};
