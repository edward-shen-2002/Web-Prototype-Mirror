import passportLocal from 'passport-local';
import passport from 'passport';
import UserModel from '../../models/User/model';

const LocalStrategy = passportLocal.Strategy;

module.exports = () => {
  passport.use(
    'signup',
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true,
      },
      function (req, email, password, done) {
        if (email) email = email.toLowerCase();
        process.nextTick(function () {
          UserModel.findOne({ email }, function (err, user) {
            if (err) return done(err);
            if (user) {
              return done(null, false);
            }
            const newUser = new UserModel();
            newUser.email = email;
            newUser.password = newUser.generateHash(password);
            newUser.save(function (err) {
              if (err) {
                return done(err);
              }
              newUser.generateAuthToken();
              req.session.user = user;
              return done(null, newUser);
            });
          });
        });
      },
    ),
  );
};
