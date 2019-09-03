import { renderRolePage, addRole, editRole, addRoleResult, editRoleResult } from '../controllers/role/editRole';
import { viewUsers, editUserRole, editUserRoleResult } from '../controllers/role/editUserRole'
import express from 'express';
let router = express.Router();
router.get('/', viewUsers);
router.get('/edit', editUserRole);
router.put('/edit', editUserRoleResult);
module.exports = router;
