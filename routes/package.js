import {renderRegistration, registerPackage} from '../controllers/package/register';
import express from 'express';
let router = express.Router();
router.get('/', renderRegistration );
router.post('/register', registerPackage);
module.exports = router;
