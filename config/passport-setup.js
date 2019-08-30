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
            //passport callback

            console.log('passport callback fired returned with profile');
            console.log(profile.emails[0].value, '========================================');
            try {
                let user = await users.findOne({ where: { email: profile.emails[0].value } })
                if (user) {
                    //google login user already exist. redirect to dashboard
                    if (user.eKey) {
                        if (user.eKey == accessToken) {
                            req.session.user = user;
                            req.loggedIn = true
                            return done(null, user)
                        } else {
                            console.log('=============token not matching======================');
                            return done(null, user)
                            // throw 'Error in passport-setup: accessToken not matching.'
                        }
                    } else {
                        console.log('============ekey null======================');
                        req.googleOAuth = true
                        req.userId = user.id
                        return done(null, user)
                        // throw 'Error in passport-setup: user already exists without ekey'
                    }

                } else {
                    console.log('========================================');
                    let user = await users.create({
                        name: profile.displayName,
                        email: profile.emails[0].value,
                        ekey: accessToken
                    })
                    // create a default role for user     
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