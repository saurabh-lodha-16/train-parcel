import { renderRolePage, addRole, editRole, addRoleResult, editRoleResult } from '../controllers/role/editRole';
import { viewUsers, editUserRole, editUserRoleResult } from '../controllers/role/editUserRole'
import express from 'express';
let router = express.Router();
router.get('/', renderRolePage);
router.get('/add_role', addRole);
router.post('/add_role', addRoleResult);
router.get('/edit_role', editRole);
router.post('/edit_role', editRoleResult);
router.get('/users', viewUsers);
router.get('/edit_user_role', editUserRole);
router.post('/edit_user_role', editUserRoleResult);
module.exports = router;

