const express = require('express');
const router = express.Router();
import { fetchAllTrains as allCities } from '../../controllers/train/fetchAll';
router.get('/', allCities);
module.exports = router;