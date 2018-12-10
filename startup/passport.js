const passport = require("passport");
const googleStrategy = require("passport-google-oauth20");
const config = require('config');

passport.use(
  new googleStrategy({
    clientID: config.get("googleClientID"),
    clientSecret: config.get("googleClientSecret"),
    callbackURL: config.get("googleCallBack")
  }),
  (accessToken, refreshToken, profile, done) => {
    console.log(accessToken);
  }
);

passport.use();
