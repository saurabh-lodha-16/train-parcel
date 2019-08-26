const express = require('express');
const router = express.Router();
<<<<<<< Updated upstream
import { getStations } from '../controllers/trainStatus/getStations';
import { fillStations, addSomeShit, getPackageStatus } from '../controllers/trainStatus/fillStations';
router.get('/', getStations);
router.get('/fillStations', fillStations);
router.get('/addSomeShit', addSomeShit);
//router.post('/getPackageStatus', getPackageStatus);
module.exports = router;
=======
import { getStations }  from '../controllers/trainStatus/getStations';
import { fillStations, addSomeShit, addDummyPackage } from '../controllers/trainStatus/fillStations';
import { getPackageStatus } from '../controllers/trainStatus/getPackageStatus';
import { trainBetween } from '../controllers/trainStatus/trainsBetween';


router.get('/', getStations);
router.get('/fillStations', fillStations);
router.get('/addSomeShit', addSomeShit);
router.post('/getPackageStatus', getPackageStatus);
router.get('/addDummyPackage', addDummyPackage);
router.post('/trainBetween', trainBetween);


module.exports = router;






>>>>>>> Stashed changes
