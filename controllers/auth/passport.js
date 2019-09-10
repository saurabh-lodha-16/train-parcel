const passport = require('passport');

export function getRedirect(req, res) {
    if (req.googleOAuth) {
        res.render('auth/register', {
            googleOAuth: true,
            userId: req.userId,
            alert: 'success',
            alertMsg: `Hey! You need to verify your Phone number to continue.`
        })
    } else if (req.loggedIn) {
        res.redirect('/')
    }

}

