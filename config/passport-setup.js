const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
import { users } from '../models'
import { clientID, clientSecret } from './googleCreds'

try {
  passport.use(
    new GoogleStrategy({
      callbackURL: 'http://lvh.me:3000/oAuth/redirect',
      clientID: clientID,
      clientSecret: clientSecret,
      passReqToCallback: true
    }, async (req, accessToken, refreshToken, profile, done) => {
      try {
        let user = await users.findOne({ where: { email: profile.emails[0].value } })
        if (user) {
          if (user.eKey) {
            if (user.eKey == accessToken) {
              req.session.user = user;
              req.loggedIn = true
              return done(null, user)
            } else {
              return done(null, user)
            }
          } else {
            req.googleOAuth = true
            req.userId = user.id
            return done(null, user)
          }
        } else {
          let user = await users.create({
            name: profile.displayName,
            email: profile.emails[0].value,
            ekey: accessToken
          })
          req.googleOAuth = true
          req.userId = user.id
          return done(null, user)
        }
      } catch (e) {
        console.error('Exception in passport.js', e)
        done(null, '')
      }
    })
  );

} catch (e) {
  console.error('Exception in passport.js', e)
}


passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});
