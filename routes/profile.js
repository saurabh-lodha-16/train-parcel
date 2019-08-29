import { renderUpdation, updateProfile } from '../controllers/profile/update';
import express from 'express';
let router = express.Router();
router.get('/', renderUpdation);
router.post('/', updateProfile);
module.exports = router;

