const express = require('express');
const router = express.Router();
import { fetchAllUsers } from '../../controllers/users/fetchAll';

router.get('/', fetchAllUsers);

module.exports = router;

