const express = require('express');
const router = express.Router();
import { addTrain } from '../../controllers/train/add';
import { updateTrain } from '../../controllers/train/update';
import { editTrain } from '../../controllers/train/edit';
import { getRole } from '../../controllers/services/common';



router.get('/', async (req, res, next) => {
  let loggedUser = req.session.user
  if (loggedUser) {
    res.render('base', {
      content: 'train/train',
      userRole: await getRole(loggedUser.id)
    });
  } else {
    res.redirect('/login')
  }

});


router.get('/add', function (req, res, next) {
  res.render('train/add');
});

router.post('/', addTrain);

router.get('/edit', editTrain);
router.put('/', updateTrain);

module.exports = router;

