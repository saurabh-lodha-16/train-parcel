const express = require('express');
const router = express.Router();
import { getStations }  from '../controllers/trainStatus/getStations';
import { fillStations, addSomeShit } from '../controllers/trainStatus/fillStations';

router.get('/', getStations);
router.get('/fillStations', fillStations);
router.post('/addSomeShit', addSomeShit);

module.exports = router;