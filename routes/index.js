var express = require('express');
var router = express.Router();
import { loginGet } from '../controllers/auth/login'
import { loginPost } from '../controllers/auth/login'
import { registerGet } from '../controllers/auth/register'
import { registerPost } from '../controllers/auth/register'
import { dashboardGet } from '../controllers/dashboard'
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/login', loginGet);
router.post('/login', loginPost);

router.get('/register', registerGet);
router.post('/register', registerPost);


router.get('/dashboard', dashboardGet);

module.exports = router;
