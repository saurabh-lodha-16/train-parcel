const express = require('express');
const router = express.Router();
import { fetchAllTrains as allCities } from '../controllers/train/FetchAllTrains';
import { addTrain } from '../controllers/train/AddTrain';
import { updateTrain } from '../controllers/train/UpdateTrain';
import { editTrain } from '../controllers/train/EditTrain';
import { getRole } from '../controllers/common';

router.get('/', allCities);

router.get('/list', async (req, res, next) => {
  let loggedUser = req.session.user
  if(loggedUser){
    res.render('base',{
      content: 'train/train',
      userRole: await getRole(loggedUser.id)
    });
  }else{
    res.redirect('/login')
  }
 
});


router.get('/add', function (req, res, next) {
  res.render('train/add');
});

router.post('/add', addTrain);

router.get('/edit', editTrain);
router.post('/edit', updateTrain);

module.exports = router;

