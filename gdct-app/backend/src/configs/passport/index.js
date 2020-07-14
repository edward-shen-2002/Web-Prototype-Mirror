var OauthUser = require('../../models/OauthUser/model');
var User = require('../../models/User/model');

module.exports = function (passport) {
  passport.serializeUser(function (user, done) {
    done(null, user);
  });

  passport.deserializeUser(function (id, done) {
    OauthUser.findById(id, function (err, user) {
      done(err, user);
    });
  });

  require('./localConfig')(passport);
  require('./signupConfig')(passport);
  require('./facebookConfig')(passport);
  require('./googleConfig')(passport);
};
