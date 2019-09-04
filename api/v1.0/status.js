const express = require('express');
const router = express.Router();
import { fetchAllStatus as allStatus } from '../../controllers/status/fetchAll';
router.get('/', allStatus);
module.exports = router;