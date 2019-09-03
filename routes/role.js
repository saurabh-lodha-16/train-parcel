import { renderRolePage, addRole, editRole, addRoleResult, editRoleResult } from '../controllers/role/edit';
import { viewUsers, editUserRole, editUserRoleResult } from '../controllers/userRole/edit'
import express from 'express';
let router = express.Router();
router.get('/', renderRolePage);
router.get('/add', addRole);
router.post('/add', addRoleResult);
router.get('/edit', editRole);
router.put('/edit', editRoleResult);
module.exports = router;

