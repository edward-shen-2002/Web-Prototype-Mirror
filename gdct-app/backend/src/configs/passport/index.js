import UserModel from '../../models/User/model';
import passport from 'passport';

module.exports = () => {
  passport.serializeUser(function (user, done) {
    done(null, user);
  });

  passport.deserializeUser(function (id, done) {
    UserModel.findById(id, function (err, user) {
      done(err, user);
    });
  });

  require('./localConfig')();
  require('./signupConfig')();
  require('./facebookConfig')();
  require('./googleConfig')();
};
