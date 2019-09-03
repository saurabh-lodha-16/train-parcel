import { renderRolePage, addRole, editRole, addRoleResult, editRoleResult } from '../controllers/role/editRole';
import express from 'express';
let router = express.Router();
router.get('/', renderRolePage);
router.get('/add', addRole);
router.post('/', addRoleResult);
router.get('/edit', editRole);
router.put('/', editRoleResult);
module.exports = router;

