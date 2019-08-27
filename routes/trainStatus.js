const express = require('express')
const router = express.Router()
import { getStations }  from '../controllers/trainStatus/geroutestStations'
import { fillStations, addSomeShit, addDummyPackage } from '../controllers/trainStatus/fillStations'
import { trainBetween } from '../controllers/trainStatus/trainsBetween'


router.get('/', getStations);
router.get('/fillStations', fillStations);
router.get('/addSomeShit', addSomeShit);
router.get('/addDummyPackage', addDummyPackage);
router.post('/trainBetween', trainBetween);
module.exports = router;
