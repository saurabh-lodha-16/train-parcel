const express = require('express');
const router = express.Router();
import { fetchAllStatus as allStatus } from '../../controllers/status/FetchAllStatus';
router.get('/', allStatus);
module.exports = router;