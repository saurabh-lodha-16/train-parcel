import {renderRegistration, registerPackage} 
from '../controllers/packageController/packageController';
import express from 'express';
let router = express.Router();
router.get('/', renderRegistration );
router.post('/register', registerPackage);
module.exports = router;
