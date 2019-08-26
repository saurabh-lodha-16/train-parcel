const express = require('express');
const router = express.Router();
import { getStations }  from '../controllers/trainStatus/getStations';
import { fillStations, addSomeShit, getPackageStatus } from '../controllers/trainStatus/fillStations';

router.get('/', getStations);
router.get('/fillStations', fillStations);
router.get('/addSomeShit', addSomeShit);
// router.post('/getPackageStatus', getPackageStatus);

module.exports = router;