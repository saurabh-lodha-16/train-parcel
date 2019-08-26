import db from '../../models';
let users = db['users'];
let roles = db['roles'];
let roleAssigns = db['roleAssigns'];

export async function viewUsers(req, res) {
  exports.viewUsers = async function (req, res) {
    let userArray = await users.findAll({
      include: [{
        model: roleAssigns,
        include: [{
          model: roles
        }]
      }]
    });
    res.render('role/viewUsers.ejs', {
      usersArray: userArray
    });
  };
}

export async function editUserRole(req, res) {
  exports.editUserRole = async function (req, res) {
    let roleArray = await roles.findAll({
      attributes: ['id', 'name', 'level']
    });
    res.render('role/editUserRole.ejs', {
      user_id: req.body.user_id,
      roleArray: roleArray
    });
  };
}

export async function editUserRoleResult(req, res) {
  await roleAssigns.update(
    { roleId: req.body.role_id },
    { where: { userId: req.body.user_id } }
  );
  res.redirect('../../view_users');
};
