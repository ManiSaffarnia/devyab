const passport = require("passport");
const googleStrategy = require("passport-google-oauth20");
const keys = require("../config/keys");

passport.use(
  new googleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: "/register/googleAuth/callback"
  }),
  (accessToken, refreshToken, profile, done) => {
    console.log(accessToken);
  }
);

passport.use();
