var express = require('express');
const passport = require('passport');
const router = express.Router();
import { getLogout, getRedirect } from '../../controllers/auth/passport'
router.get('/login', passport.authenticate('google', {
    scope: ['profile', 'email']
}));
router.get('/logout', getLogout);

router.get('/redirect', passport.authenticate('google'), getRedirect);

module.exports = router;

