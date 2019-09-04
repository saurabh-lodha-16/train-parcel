import db from '../../models';
import { getRole } from '../common';
let roles = db['roles'];

export async function renderRolePage(req, res) {
  let loggedUser = req.session.user

  if (req.session.user) {
    let role = await getRole(loggedUser.id)
    if (role == 'Admin') {
      try {
        let roleArray = await roles.findAll({
          attributes: ['id', 'name', 'level']
        });
        res.render('base', {
          content: 'role/index.ejs',
          rolesArray: roleArray,
          userRole: role
        });

      } catch (err) {
        res.send(err);
      }
    } else {
      res.send('Unauthorized Access')
    }
  } else {
    res.redirect('/login');
  }
};

export async function renderAddRole(req, res) {
  let loggedUser = req.session.user
  if (loggedUser) {
    let role = await getRole(loggedUser.id)
    if (role == 'Admin') {
      try {
        res.render('base', {
          content: 'role/add.ejs',
          userRole: await getRole(loggedUser.id)
        });

      } catch (err) {
        res.send(err);
      }
    } else {
      res.send('Unauthorized Access')
    }
  } else {
    res.redirect('/login');
  }
};

export async function addRole(req, res) {
  let loggedUser = req.session.user
  let roleArray = await roles.findAll({
    attributes: ['id', 'name', 'level']
  });
  if (loggedUser) {
    let role = await getRole(loggedUser.id)
    if (role == 'Admin') {
      try {

        let createdRole = await roles.create({
          name: req.body.name,
          level: req.body.level
        });
        roleArray = await roles.findAll({
          attributes: ['id', 'name', 'level']
        });
        res.render('base', {
          content: 'role/index.ejs',
          alertMsg: "Role successfully added.",
          alert: "success",
          rolesArray: roleArray,
          userRole: await getRole(loggedUser.id)
        });

      } catch (err) {
        res.render('base', {
          content: 'role/index.ejs',
          alertMsg: err,
          alert: "danger",
          rolesArray: roleArray,
          userRole: await getRole(loggedUser.id)
        });
      }
    } else {
      res.send('Unauthorized Access')
    }
  } else {
    res.redirect('/login');
  }
};

export async function renderEditRole(req, res) {
  let loggedUser = req.session.user
  if (loggedUser) {
    let role = await getRole(loggedUser.id)
    if (role == 'Admin') {
      try {
        let roleInstance = await roles.findOne({ where: { id: req.query.role_id } });
        res.render('base', {
          content: 'role/edit.ejs',
          name: roleInstance.name,
          level: roleInstance.level,
          role_id: req.query.role_id,
          userRole: await getRole(loggedUser.id)
        });

      } catch (err) {
        res.send(err);
      }
    } else {
      res.send('Unauthorized Access')
    }
  } else {
    res.redirect('/login');
  }
};

export async function editRole(req, res) {
  let loggedUser = req.session.user
  let roleArray = await roles.findAll({
    attributes: ['id', 'name', 'level']
  });
  if (loggedUser) {
    let role = await getRole(loggedUser.id)
    if (role == 'Admin') {
      try {
        let roleInstance = await roles.findOne({ where: { id: req.body.role_id } });
        await roles.update(
          { name: req.body.name, level: req.body.level },
          { where: { id: req.body.role_id } }
        );
        roleArray = await roles.findAll({
          attributes: ['id', 'name', 'level']
        });
        res.render('base', {
          content: 'role/index.ejs',
          name: req.body.name,
          level: req.body.level,
          alertMsg: "Role successfully editted.",
          role_id: req.body.role_id,
          rolesArray: roleArray,
          alert: "success",
          userRole: await getRole(loggedUser.id)
        });

      } catch (err) {
        res.render('base', {
          content: 'role/index.ejs',
          alertMsg: err,
          alert: "danger",
          rolesArray: roleArray,
          role_id: req.body.role_id,
          userRole: await getRole(loggedUser.id)
        });
      }
    } else {
      res.send('Unauthorized Access')
    }
  } else {
    res.redirect('/login');
  }
};

