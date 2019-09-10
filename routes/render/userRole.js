import { viewUsers, editUserRole, renderEditUserRole } from '../../controllers/userRole/edit'
import express from 'express';
let router = express.Router();
router.get('/', viewUsers);
router.put('/:user_id', editUserRole);
router.get('/edit', renderEditUserRole);
module.exports = router;

