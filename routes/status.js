const express = require('express');
const router = express.Router();

import { addStatus } from '../controllers/status/AddStatus';
import { updateStatus } from '../controllers/status/UpdateStatus';
import { editStatus } from '../controllers/status/EditStatus';


router.get('/', (req, res, next) => {
  res.render('status/status');
});

router.get('/add', function (req, res, next) {
  res.render('status/add');
});

router.post('/add', addStatus);
router.get('/edit', editStatus);
router.put('/', updateStatus);

module.exports = router;

