import db from '../../models';
import { getRole } from '../common';
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
    let role = await getRole(loggedUser.id)
    if (role == 'Admin') {
      try {
        userArray = await users.findAll({
          include: [{
            model: roleAssigns,
            include: [{
              model: roles
            }]
          }]
        });
        if (req.flash('editUserRoleSuccess')) {
          res.render('base', {
            content: 'userRole/index.ejs',
            usersArray: userArray,
            userRole: await getRole(loggedUser.id),
            alertMsg: req.flash('editUserRoleSuccess'),
            alert: "success"
          });
          return "editUserRoleSuccess";
        }
        if (userArray) {
          res.render('base', {
            content: 'userRole/index.ejs',
            usersArray: userArray,
            userRole: await getRole(loggedUser.id)
          });
        } else {
          res.render('base', {
            content: 'userRole/index.ejs',
            usersArray: userArray,
            alertMsg: "No users found",
            alert: "info",
            userRole: await getRole(loggedUser.id)
          });
        }

      } catch (err) {
        res.status(500);
        res.render('base', {
          content: 'userRole/index.ejs',
          usersArray: userArray,
          alertMsg: err,
          alert: "error",
          userRole: await getRole(loggedUser.id)
        });
      }
    } else {
      res.status(403).send('Unauthorized Access');
    }
  } else {
    res.redirect('/login');
  }
}

async function getRoleByName(name) {
  try {
    let roleInstance = await roles.findOne({
      where: { name: name }
    });
    return roleInstance;
  } catch (err) {
    throw (err);
  }
}

export async function renderEditUserRole(req, res) {
  let loggedUser = req.session.user

  if (loggedUser) {
    let role = await getRole(loggedUser.id)
    if (role == 'Admin') {
      try {
        let roleArray = await roles.findAll({
          attributes: ['id', 'name', 'level']
        });
        res.render('base', {
          content: 'userRole/edit.ejs',
          user_id: req.query.user_id,
          roleArray: roleArray,
          userRole: await getRole(loggedUser.id)
        });

      } catch (err) {
        res.status(500).send(err);
      }
    } else {
      res.status(403).send('Unauthorized Access');
    }
  } else {
    res.redirect('/login');
  }
};

export async function editUserRole(req, res) {
  let roleArray, userArray;
  let loggedUser = req.session.user

  if (loggedUser) {
    let role = await getRole(loggedUser.id)
    if (role == 'Admin') {
      try {
        roleArray = await roles.findAll({
          attributes: ['id', 'name', 'level']
        });
        let userRoleEntry = await roleAssigns.findOne({
          where: { userId: req.params.user_id }
        });
        if (!userRoleEntry) {
          await roleAssigns.create({
            roleId: req.body.role_id,
            userId: req.params.user_id
          });
        }
        await roleAssigns.update(
          { roleId: req.body.role_id },
          { where: { userId: req.params.user_id } }
        );
        userArray = await users.findAll({
          include: [{
            model: roleAssigns,
            include: [{
              model: roles
            }]
          }]
        });
        req.flash('editUserRoleSuccess', "User's role successfully updated");
        res.redirect('/user-roles');
      } catch (err) {
        res.status(500);
        res.render('base', {
          content: 'userRole/index.ejs',
          user_id: req.params.user_id,
          roleArray: roleArray,
          alertMsg: err,
          usersArray: userArray,
          alert: "error",
          userRole: await getRole(loggedUser.id)
        });
      }
    } else {
      res.status(403).send('Unauthorized Access');
    }
  } else {
    res.redirect('/login');
  }
};

