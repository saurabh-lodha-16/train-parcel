import * as express from 'express'
import { loginGet, logoutGet } from '../../controllers/auth/login'
import { loginPost } from '../../controllers/auth/login'
import { registerGet, resendOTPPost } from '../../controllers/auth/register'
import { registerPost } from '../../controllers/auth/register'
import { dashboardGet } from '../../controllers/services/dashboard'
import { renderChangePassword } from '../../controllers/auth/changePassword'
import { updateProfile } from '../../controllers/profile/update'
const router = express.Router();

router.get('/', loginGet);
router.get('/login', loginGet);
router.post('/login', loginPost);
router.get('/logout', logoutGet);
router.get('/register', registerGet);
router.post('/users', registerPost);
router.post('/register', registerPost);
router.get('/password', renderChangePassword);
router.put('/users', updateProfile);
router.get('/dashboard', dashboardGet);
router.post('/register/resendOTP/', resendOTPPost)

module.exports = router;

