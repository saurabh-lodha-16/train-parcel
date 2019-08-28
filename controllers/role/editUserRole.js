import db from '../../models';
let users = db['users'];
let roles = db['roles'];
let roleAssigns = db['roleAssigns'];

export async function addRoleAssign(userId, roleId) {
  let roleAssignInstance = roleAssigns.create({
    userId: userId,
    roleId: roleId
  });
  return roleAssignInstance;
}

export async function viewUsers(req, res) {
  let userArray;
  try {
    if (req.session.user) {
      userArray = await users.findAll({
        include: [{
          model: roleAssigns,
          include: [{
            model: roles
          }]
        }]
      });
      if (userArray) {
        res.render('base', {
          content: 'role/viewUsers.ejs',
          usersArray: userArray
        });
      } else {
        res.render('base', {
          content: 'role/viewUsers.ejs',
          usersArray: userArray,
          alertMsg: "No users found",
          alert: "info"
        });
      }
    } else {
      res.redirect('/login');
    }
  } catch (err) {
    res.render('base', {
      content: 'role/viewUsers.ejs',
      usersArray: userArray,
      alertMsg: err,
      alert: "error"
    });
  }
};

export async function editUserRole(req, res) {
  try {
    if (req.session.user) {
      let roleArray = await roles.findAll({
        attributes: ['id', 'name', 'level']
      });
      res.render('base', {
        content: 'role/editUserRole.ejs',
        user_id: req.query.user_id,
        roleArray: roleArray
      });
    } else {
      res.redirect('/login');
    }
  } catch (err) {
    res.send(err);
  }
};

export async function editUserRoleResult(req, res) {
  let roleArray;
  try {
    if (req.session.user) {
      roleArray = await roles.findAll({
        attributes: ['id', 'name', 'level']
      });
      await roleAssigns.update(
        { roleId: req.body.role_id },
        { where: { userId: req.body.user_id } }
      );
      res.render('base', {
        content: 'role/editUserRole.ejs',
        user_id: req.body.user_id,
        roleArray: roleArray,
        alert: "success",
        alertMsg: "Role successfully updated for user"
      });
    } else {
      res.redirect('/login');
    }
  } catch (err) {
    res.render('base', {
      content: 'role/editUserRole.ejs',
      user_id: req.body.user_id,
      roleArray: roleArray,
      alertMsg: err,
      alert: "error"
    });
  }
};
