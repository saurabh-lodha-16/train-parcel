const express = require('express');
const router = express.Router();
import { updateOffice } from '../controllers/office/UpdateOffice';
import { editOffice } from '../controllers/office/EditOffice';
import { cityAssign } from '../controllers/office/cityAssign';
import { getRole } from '../controllers/common';

router.get('/', async (req, res, next) => {
  let user = req.session.user;
  if (user && req.cookies.user_sid) {
    res.render('base', {
      content: 'office/offices',
      userRole: await getRole(user.id)
    })
  } else {
    res.render('auth/login', { alert: 'danger', alertMsg: 'Please Login first!' });
  }

});

router.get('/add', async (req, res, next) => {
  let user = req.session.user;
  if (user && req.cookies.user_sid) {
    res.render('base', {
      content: 'office/cityAssign',
      userRole: await getRole(user.id)
    })
  } else {
    res.render('auth/login', { alert: 'danger', alertMsg: 'Please Login first!' });
  } 
});

router.get('/edit', editOffice);
router.put('/', updateOffice);


router.get('/add', async (req, res, next) => {
  let user = req.session.user;
  if (user && req.cookies.user_sid) {
    res.render('base', {
      content: 'office/cityAssign',
      userRole: await getRole(user.id)
    })
  } else {
    res.render('auth/login', { alert: 'danger', alertMsg: 'Please Login first!' });
  } 
});
router.post('/', cityAssign);
module.exports = router;

