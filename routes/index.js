var express = require('express');
var router = express.Router();
import { loginGet, logoutGet } from '../controllers/auth/login'
import { loginPost } from '../controllers/auth/login'
import { registerGet, resendOTPGet } from '../controllers/auth/register'
import { registerPost } from '../controllers/auth/register'
import { dashboardGet } from '../controllers/dashboard'
import { renderChangePassword } from '../controllers/auth/changePassword'
import { changePassword } from '../controllers/auth/changePassword'
/* GET home page. */
router.get('/', loginGet);

router.get('/login', loginGet);
router.post('/login', loginPost);
router.get('/logout', logoutGet);

router.get('/register', registerGet);
router.post('/register', registerPost);

router.get('/changePassword', renderChangePassword);
router.post('/changePassword', changePassword);

router.get('/dashboard', dashboardGet);

router.get('/register/resendOTP/:userId', resendOTPGet)

module.exports = router;

