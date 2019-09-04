const express = require('express');
const router = express.Router();
import { fetchAllUsers } from '../controllers/users/fetchAll';
/* GET users listing. */
router.get('/', fetchAllUsers);

module.exports = router;

