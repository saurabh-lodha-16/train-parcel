const express = require('express');
const router = express.Router();
import { fetchAllOffices as allCities } from '../controllers/office/FetchAllOffices';

import { updateOffice } from '../controllers/office/UpdateOffice';
import { editOffice } from '../controllers/office/EditOffice';
import { cityAssign } from '../controllers/office/cityAssign';

router.get('/all', allCities);

router.get('/', (req, res, next) => {
  let user = req.session.user;
  if (user && req.cookies.user_sid) {
    res.render('base', {
      content: 'office/offices',
    })
  } else {
    res.render('auth/login', { alert: 'danger', alertMsg: 'Please Login first!' });
  }

});

router.get('/add', function (req, res, next) {
  let user = req.session.user;
  if (user && req.cookies.user_sid) {
    res.render('base', {
      content: 'office/cityAssign',
    })
  } else {
    res.render('auth/login', { alert: 'danger', alertMsg: 'Please Login first!' });
  } 
});

router.get('/edit', editOffice);
router.post('/edit', updateOffice);


router.get('/cityAssign', (req, res, next) => {
  let user = req.session.user;
  if (user && req.cookies.user_sid) {
    res.render('base', {
      content: 'office/cityAssign',
    })
  } else {
    res.render('auth/login', { alert: 'danger', alertMsg: 'Please Login first!' });
  } 
});
router.post('/cityAssign', cityAssign);
module.exports = router;

