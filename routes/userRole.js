import { renderRolePage, addRole, editRole, addRoleResult, editRoleResult } from '../controllers/role/edit';
import { viewUsers, editUserRole, editUserRoleResult } from '../controllers/userRole/edit'
import express from 'express';
let router = express.Router();
router.get('/', viewUsers);
router.put('/', editUserRoleResult);
router.get('/edit', editUserRole);
module.exports = router;

