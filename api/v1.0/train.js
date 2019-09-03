const express = require('express');
const router = express.Router();
import { fetchAllTrains as allCities } from '../../controllers/train/FetchAllTrains';
router.get('/', allCities);
module.exports = router;