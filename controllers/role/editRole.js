import db from '../../models';
let roles = db['roles'];

export async function renderRolePage(req, res) {
  let roleArray = await roles.findAll({
    attributes : ['id', 'name', 'level']
  });
  res.render('role/index.ejs', {
    rolesArray : roleArray
  });
};

export function addRole(req, res) {
  res.render('role/addRole.ejs');
};

export async function addRoleResult(req, res) {
  let createdRole = await roles.create({
    name : req.body.name,
    level : req.body.level
  });
  res.redirect('/role');
};

export function editRole(req, res) {
  res.render('role/editRole.ejs',{
    role_id : req.body.role_id
  });
};

export async function editRoleResult(req, res) {
  await roles.update (
    {name : req.body.name, level : req.body.level},
    {where : {id : req.body.user_id}}
  );
  res.redirect('/role');
};
