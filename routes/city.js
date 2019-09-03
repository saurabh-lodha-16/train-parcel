const express = require('express');
const router = express.Router();
import { addCity } from '../controllers/city/add';
import { updateCity } from '../controllers/city/update';
import { editCity } from '../controllers/city/edit';


router.get('/', (req, res, next) => {
  res.render('city/city');
});

router.get('/add', function (req, res, next) {
  res.render('city/add');
});

router.post('/', addCity);

router.get('/edit', editCity);
router.put('/', updateCity);

module.exports = router;

