import passportLocal from 'passport-local';
import UserModel from '../../models/User/model';
import passport from 'passport';
var LocalStrategy = passportLocal.Strategy;

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
          UserModel.findOne({ email: email }, function (err, user) {
            if (err) return done(err);
            if (user) {
              return done(null, false);
            } else {
              var newUser = new UserModel();
              newUser.email = email;
              newUser.password = newUser.generateHash(password);
              newUser.save(function (err) {
                if (err) {
                  return done(err);
                } else {
                  newUser.generateAuthToken();
                  req.session.user = user;
                  return done(null, newUser);
                }
              });
            }
          });
        });
      }
    )
  );
};
