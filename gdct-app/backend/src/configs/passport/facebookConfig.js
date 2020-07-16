import passportFacebook from 'passport-facebook';
import UserModel from '../../models/User/model';
import configAuth from './auth';
import passport from 'passport';
var FacebookStrategy = passportFacebook.Strategy;

module.exports = () => {
  var fbStrategy = configAuth.facebook;
  fbStrategy.passReqToCallback = true;
  passport.use(
    new FacebookStrategy(fbStrategy, function (
      req,
      token,
      refreshToken,
      profile,
      done
    ) {
      process.nextTick(function () {
        UserModel.findOne(
          { email: profile.emails[0].value.toLowerCase() },
          function (err, user) {
            if (err) return done(err);
            if (user) {
              if (!user.facebook.token) {
                user.facebook.id = profile.id;
                user.facebook.token = token;
                user.save(function (err) {
                  if (err) {
                    return done(err);
                  } else {
                    User.findOne(
                      { email: profile.emails[0].value.toLowerCase() },
                      function (err, user1) {
                        req.session.user = user1;
                        req.session.token = token;
                      }
                    );
                    return done(null, user);
                  }
                });
              } else {
                req.session.user = user;
                req.session.token = token;
                return done(null, user);
              }
            } else {
              done(null);
            }
          }
        );
      });
    })
  );
};
