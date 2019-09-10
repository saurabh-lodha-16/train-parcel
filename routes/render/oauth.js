import * as express from 'express'
import { getRedirect } from '../../controllers/auth/passport'
import { logoutGet } from '../../controllers/auth/login'

const passport = require('passport')
const router = express.Router()

router.get('/login', passport.authenticate('google', {
    scope: ['profile', 'email']
}))

router.get('/logout', logoutGet);
router.get('/redirect', passport.authenticate('google'), getRedirect);

module.exports = router;

