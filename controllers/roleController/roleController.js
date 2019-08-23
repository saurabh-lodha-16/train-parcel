import db from '../../models';
let roles = db['roles'];

exports.renderRolePage = async function(req, res) {
  let roleArray = await roles.findAll({
    attributes : ['id', 'name', 'level']
  });
  res.render('role/index.ejs', {
    rolesArray : roleArray
  });
};

exports.addRole = function(req, res) {
  res.render('role/addRole.ejs');
};

exports.addRoleResult = async function(req, res) {
  let createdRole = await roles.create({
    name : req.body.name,
    level : req.body.level
  });
  res.redirect('/role');
};

exports.editRole = function(req, res) {
  res.render('role/editRole.ejs',{
    role_id : req.body.role_id
  });
};

exports.editRoleResult =async function(req, res) {
  await roles.update (
    {name : req.body.name, level : req.body.level},
    {where : {id : req.body.user_id}}
  );
  res.redirect('/role');
};
