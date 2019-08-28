const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
import { users } from '../models'
import { clientID, clientSecret } from './googleCreds'
passport.use(
    new GoogleStrategy({
        callbackURL: 'http://lvh.me:3000/oAuth/redirect',
        clientID: clientID,
        clientSecret: clientSecret,
        passReqToCallback: true
    }, (req, accessToken, refreshToken, profile, done) => {
        //passport callback
        // console.log('passport callback fired returned with profile');
        console.log(profile.emails[0].value, '========================================');

        users.findOne({ where: { email: profile.emails[0].value } }).then(user => {
            if (user) {
                //google login user already exist. redirect to dashboard
                if (user.eKey == accessToken) {
                    req.session.user = user;
                    req.loggedIn = true
                    return done()
                } else {
                    throw 'Error in passport-setup: accessToken not matching.'
                }
            } else {
                console.log('========================================');
                users.create({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    ekey: accessToken
                }).then(user => {
                    // create a default role for user     
                    req.googleOAuth = true
                    req.userId = user.id
                    return done()
                });
            }
        })



    })
);
