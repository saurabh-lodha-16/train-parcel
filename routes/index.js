var express = require('express');
var router = express.Router();
import { loginGet } from '../controllers/login'
import { loginPost } from '../controllers/login'
import { registerGet } from '../controllers/register'
import { registerPost } from '../controllers/register'

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express', selected: 2 });
});

router.get('/login', loginGet);
router.post('/login', loginPost);

router.get('/register', registerGet);
router.post('/register', registerPost);

module.exports = router;
