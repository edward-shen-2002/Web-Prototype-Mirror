import passportLocal from 'passport-local';
import UserModel from '../../models/User/model';
import passport from 'passport';
var LocalStrategy = passportLocal.Strategy;

module.exports = () => {
  passport.use(
    'local',
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true,
      },
      function (req, email, password, done) {
        if (email) email = email.toLowerCase();
        process.nextTick(function () {
          UserModel.findOne({ email: email }, function (err, user) {
            if (err) return done(err);
            if (!user) return done(null, false);
            if (!user.validPassword(password, user.password)) {
              return done(null, false);
            } else {
              user.generateAuthToken(user);
              req.session.user = user;
              return done(null, user);
            }
          });
        });
      }
    )
  );
};
