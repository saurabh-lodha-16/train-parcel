import db from '../../models';
import { getRole } from '../common';
import { redirectWithMsg } from '../common';
let roles = db['roles'];

export async function renderRolePage(req, res) {
  let loggedUser = req.session.user;
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
        res.status(500).send(err);
      }
    } else {
      res.status(403).send('Unauthorized Access')
    }
  } else {
    redirectWithMsg('/login', req, res, 'danger', 'Please Login first!')
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
        res.status(500).send(err);
      }
    } else {
      res.status(403).send('Unauthorized Access')
    }
  } else {
    redirectWithMsg('/login', req, res, 'danger', 'Please Login first!')
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
        if(!(req.body.name && req.body.level)) {
          throw "Please fill out required fields."
        }
        let createdRole = await roles.create({
          name: req.body.name,
          level: req.body.level
        });
        roleArray = await roles.findAll({
          attributes: ['id', 'name', 'level']
        });
        redirectWithMsg('/roles', req, res, 'success', 'Role successfully added.');
      } catch (err) {
        res.status(500);
        redirectWithMsg('/roles', req, res, 'danger', err);
      }
    } else {
      res.status(403).send('Unauthorized Access')
    }
  } else {
    redirectWithMsg('/login', req, res, 'danger', 'Please Login first!')
  }
};

