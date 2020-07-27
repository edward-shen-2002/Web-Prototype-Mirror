import passportFacebook from 'passport-facebook';
import passport from 'passport';
import UserModel from '../../models/User/model';
import configAuth from './auth';

const FacebookStrategy = passportFacebook.Strategy;

module.exports = () => {
  const fbStrategy = configAuth.facebook;
  fbStrategy.passReqToCallback = true;
  passport.use(
    new FacebookStrategy(fbStrategy, function (req, token, refreshToken, profile, done) {
      process.nextTick(function () {
        UserModel.findOne({ email: profile.emails[0].value.toLowerCase() }, function (err, user) {
          if (err) return done(err);
          if (user) {
            if (!user.facebook.token) {
              user.facebook.id = profile.id;
              user.facebook.token = token;
              user.save(function (err) {
                if (err) {
                  return done(err);
                }
                var tkn = user.generateAuthToken(user);
                req.session.user = user;
                req.session.token = tkn;
                return done(null, user);
              });
            } else {
              var tkn = user.generateAuthToken(user);
              req.session.user = user;
              req.session.token = tkn;
              return done(null, user);
            }
          } else {
            return done(null);
          }
        });
      });
    }),
  );
};
