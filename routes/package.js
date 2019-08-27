import { renderRegistration, registerPackage } from '../controllers/package/register';
import { trackGet } from '../controllers/package/track'
import express from 'express';
let router = express.Router();

router.get('/', renderRegistration);
router.post('/register', registerPackage);
router.get('/track/:serial_no', trackGet)
module.exports = router;
