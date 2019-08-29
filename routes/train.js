const express = require('express');
const router = express.Router();
import { fetchAllTrains as allCities } from '../controllers/train/FetchAllTrains';
import { addTrain } from '../controllers/train/AddTrain';
import { updateTrain } from '../controllers/train/UpdateTrain';
import { editTrain } from '../controllers/train/EditTrain';

router.get('/', allCities);

router.get('/train', (req, res, next) => {
  res.render('train/train');
});


router.get('/add', function (req, res, next) {
  res.render('train/add');
});

router.post('/add', addTrain);

router.get('/edit', editTrain);
router.post('/edit', updateTrain);

module.exports = router;

