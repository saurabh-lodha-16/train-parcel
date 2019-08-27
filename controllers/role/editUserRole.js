import db from '../../models';
let users = db['users'];
let roles = db['roles'];
let roleAssigns = db['roleAssigns'];

export async function viewUsers(req, res) {
  let userArray;
  try {
    userArray = await users.findAll({
      include: [{
        model: roleAssigns,
        include: [{
          model: roles
        }]
      }]
    });
    if (userArray) {
      res.render('role/viewUsers.ejs', {
        usersArray: userArray
      });
    } else {
      res.render('role/viewUsers.ejs', {
        usersArray: userArray,
        alertMsg: "No users found",
        alert: "info"
      });
    }
  } catch (err) {
    res.render('role/viewUsers.ejs', {
      usersArray: userArray,
      alertMsg: err,
      alert: "error"
    });
  }
};

export async function editUserRole(req, res) {
  try {
    let roleArray = await roles.findAll({
      attributes: ['id', 'name', 'level']
    });
    res.render('role/editUserRole.ejs', {
      user_id: req.body.user_id,
      roleArray: roleArray
    });
  } catch (err) {
    res.send(err);
  }
};

export async function editUserRoleResult(req, res) {
  let roleArray;
  try {
    roleArray = await roles.findAll({
      attributes: ['id', 'name', 'level']
    });
    await roleAssigns.update(
      { roleId: req.body.role_id },
      { where: { userId: req.body.user_id } }
    );
    res.render('role/editUserRole.ejs', {
      user_id: req.body.user_id,
      roleArray: roleArray
    });
  } catch (err) {
    res.render('role/editUserRole.ejs', {
      user_id: req.body.user_id,
      roleArray: roleArray,
      alertMsg: err,
      alert: "error"
    });
  }
};
