const passport = require("passport");
const googleStrategy = require("passport-google-oauth20");
const config = require('config');

const keys = require("../config/keys");

passport.use(
  new googleStrategy({
    clientID: config.get("googleClientID"),
    clientSecret: config.get("googleClientSecret"),
    callbackURL: config.get("googleCallBack")// "/register/googleAuth/callback"
  }),
  (accessToken, refreshToken, profile, done) => {
    console.log(accessToken);
  }
);

passport.use();
