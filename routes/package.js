import { renderRegistration, registerPackage } from '../controllers/package/register';
import { trackGet } from '../controllers/package/track'
import { renderUpdation, update} from '../controllers/package/update';
import express from 'express';
let router = express.Router();
router.get('/', renderRegistration);
router.post('/register', registerPackage);
router.get('/track/:serial_no', trackGet);
router.get('/updatePackage', renderUpdation);
router.post('/updatePackage', update);
module.exports = router;
