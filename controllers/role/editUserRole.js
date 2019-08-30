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
  let loggedUser = req.session.user
  if (loggedUser) {

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
        res.render('base', {
          content: 'role/viewUsers.ejs',
          usersArray: userArray,
          userRole: await getRole(loggedUser.id)
        });
      } else {
        res.render('base', {
          content: 'role/viewUsers.ejs',
          usersArray: userArray,
          alertMsg: "No users found",
          alert: "info",
          userRole: await getRole(loggedUser.id)
        });
      }

    } catch (err) {
      res.render('base', {
        content: 'role/viewUsers.ejs',
        usersArray: userArray,
        alertMsg: err,
        alert: "error",
        userRole: await getRole(loggedUser.id)
      });
    }
  } else {
    res.redirect('/login');
  }
}

async function getRole(name) {
  try {
    let roleInstance = await roles.findOne({
      where: { name: name }
    });
    return roleInstance;
  } catch (err) {
    throw (err);
  }
}

export async function editUserRole(req, res) {
  let loggedUser = req.session.user

  if (loggedUser) {
    try {
      let roleArray = await roles.findAll({
        attributes: ['id', 'name', 'level']
      });
      res.render('base', {
        content: 'role/editUserRole.ejs',
        user_id: req.query.user_id,
        roleArray: roleArray,
        userRole: await getRole(loggedUser.id)
      });

    } catch (err) {
      res.send(err);
    }
  } else {
    res.redirect('/login');
  }
};

export async function editUserRoleResult(req, res) {
  let roleArray;
  let loggedUser = req.session.user

  if (loggedUser) {
    try {
      roleArray = await roles.findAll({
        attributes: ['id', 'name', 'level']
      });
      let userRoleEntry = await roleAssigns.findOne({
        where: { userId: req.body.user_id }
      });
      if (!userRoleEntry) {
        await roleAssigns.create({
          roleId: req.body.role_id,
          userId: req.body.user_id
        });
      }
      await roleAssigns.update(
        { roleId: req.body.role_id },
        { where: { userId: req.body.user_id } }
      );
      res.render('base', {
        content: 'role/editUserRole.ejs',
        user_id: req.body.user_id,
        roleArray: roleArray,
        alert: "success",
        alertMsg: "Role successfully updated for user",
        userRole: await getRole(loggedUser.id)
      });

    } catch (err) {
      res.render('base', {
        content: 'role/editUserRole.ejs',
        user_id: req.body.user_id,
        roleArray: roleArray,
        alertMsg: err,
        alert: "error",
        userRole: await getRole(loggedUser.id)
      });
    }
  } else {
    res.redirect('/login');
  }
};

