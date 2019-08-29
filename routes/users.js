const express = require('express');
const router = express.Router();
import { fetchAllUsers } from '../controllers/users/FetchAllUsers';
/* GET users listing. */
router.get('/', fetchAllUsers);

module.exports = router;
