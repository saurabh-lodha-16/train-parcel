import { renderRolePage, addRole, editRole, addRoleResult, editRoleResult } from '../controllers/role/editRole';
import { viewUsers, editUserRole, editUserRoleResult } from '../controllers/role/editUserRole'
import express from 'express';
let router = express.Router();
router.get('/', renderRolePage);
router.get('/add_role', addRole);
router.post('/add_role/status', addRoleResult);
router.post('/edit_role', editRole);
router.post('/edit_role/status', editRoleResult);
router.post('/add_role',addRoleResult);
router.get('/edit_role',editRole);
router.post('/edit_role',editRoleResult);
router.get('/view_users', viewUsers);
router.get('/view_users/editUserRole', editUserRole);
router.post('/view_users/editUserRole', editUserRoleResult);
module.exports = router;
