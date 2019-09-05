import { renderRolePage, addRole, editRole, renderAddRole, renderEditRole} from '../controllers/role/edit';
import express from 'express';
let router = express.Router();
router.get('/', renderRolePage);
router.get('/add', renderAddRole);
router.post('/', addRole);
router.get('/edit', renderEditRole);
router.put('/:role_id', editRole);
module.exports = router;

