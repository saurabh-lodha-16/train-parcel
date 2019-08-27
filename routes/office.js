const express = require('express');
const router = express.Router();
import { fetchAllOffices as allCities } from '../controllers/office/FetchAllOffices';
import { cityAssign as addOffice } from '../controllers/office/cityAssign';
import { updateOffice } from '../controllers/office/UpdateOffice';
import { editOffice } from '../controllers/office/EditOffice';
import { cityAssign } from '../controllers/office/cityAssign';

router.get('/all', allCities);

router.get('/', (req, res, next) => {
  res.render('office/offices');
});
router.get('/office', (req, res, next) => {
  res.render('office/offices');
});


router.get('/add', function (req, res, next) {
  res.render('office/cityAssign');
});

router.post('/office', addOffice);

router.get('/edit', editOffice);
router.post('/edit', updateOffice);


router.get('/cityAssign', (req, res, next) => {
  res.render('office/cityAssign');
});
router.post('/cityAssign', cityAssign);
module.exports = router;