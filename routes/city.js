const express = require('express');
const router = express.Router();
import {fetchAllCities as allCities} from '../controllers/city/FetchAllCities';
import {addCity} from '../controllers/city/AddCity';
import {updateCity} from '../controllers/city/UpdateCity';
import {editCity} from '../controllers/city/EditCity';

router.get('/', allCities);

router.get('/city', (req, res, next) => {
  res.render('city/city');
});

router.get('/add', function(req, res, next) {
  res.render('city/add');
});

router.post('/add', addCity);

router.get('/edit', editCity);
router.post('/edit', updateCity);

module.exports = router;