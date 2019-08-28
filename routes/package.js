import { renderRegistration, registerPackage } from '../controllers/package/register';
import { trackGet } from '../controllers/package/track'
import { renderUpdation, update} from '../controllers/package/update';
import {  loadPackageGet } from '../controllers/package/load'
import {  linkPackageTrainGet } from '../controllers/package/link'
import express from 'express';
let router = express.Router();
router.get('/', renderRegistration);
router.post('/', registerPackage);
//import { loadPackage } from '../controllers/package/load'
import { listPackages } from '../controllers/package/update';
//import express from 'express';
//let router = express.Router();
router.get('/list', listPackages);
router.get('/register', renderRegistration);
router.post('/register', registerPackage);
router.get('/track/', trackGet);
router.get('/track/:serial_no', trackGet);
router.get('/update', renderUpdation);
router.post('/update', update);
router.get('/load', loadPackageGet);
router.get('/load/?serialNo=:serialNo', loadPackageGet);

router.get('/link/:sourceStatusId/:destinationStatusId/:trainId/:serialNo', linkPackageTrainGet);
// router.get('/load/o', loadPackageGet);
module.exports = router;
