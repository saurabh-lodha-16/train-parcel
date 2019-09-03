const express = require('express');
const router = express.Router();
import { fetchAllCities as allCities } from '../../controllers/city/FetchAllCities';

router.get('/', allCities);

module.exports = router;