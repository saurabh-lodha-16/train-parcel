import db from '../../models';
let roles = db['roles'];

export async function renderRolePage(req, res) {
  try {
    if (req.session.user) {
      let roleArray = await roles.findAll({
        attributes: ['id', 'name', 'level']
      });
      res.render('base', {
        content: 'role/index.ejs',
        rolesArray: roleArray
      });
    } else {
      res.redirect('/login');
    }
  } catch (err) {
    res.send(err);
  }
};

export function addRole(req, res) {
  try {
    if (req.session.user) {
      res.render('base', {
        content: 'role/addRole.ejs',
      });
    } else {
      res.redirect('/login');
    }
  } catch (err) {
    res.send(err);
  }
};

export async function addRoleResult(req, res) {
  try {
    if (req.session.user) {
      let createdRole = await roles.create({
        name: req.body.name,
        level: req.body.level
      });
      res.render('base', {
        content: 'role/addRole.ejs',
        alertMsg: "Role successfully added.",
        alert: "success"
      });
    } else {
      res.redirect('/login');
    }
  } catch (err) {
    res.render('base', {
      content: 'role/addRole.ejs',
      alertMsg: err,
      alert: "danger"
    });
  }
};

export async function editRole(req, res) {
  try {
    if (req.session.user) {
      let roleInstance = await roles.findOne({ where: { id: req.query.role_id } });
      res.render('base', {
        content: 'role/editRole.ejs',
        name: roleInstance.name,
        level: roleInstance.level,
        role_id: req.query.role_id
      });
    } else {
      res.redirect('/login');
    }
  } catch (err) {
    res.send(err);
  }
};

export async function editRoleResult(req, res) {
  try {
    if (req.session.user) {
      await roles.update(
        { name: req.body.name, level: req.body.level },
        { where: { id: req.body.role_id } }
      );
      res.render('base', {
        content: 'role/editRole.ejs',
        name: req.body.name,
        level: req.body.level,
        alertMsg: "Role successfully editted.",
        role_id: req.body.role_id,
        alert: "success"
      });
    } else {
      res.redirect('/login');
    }
  } catch (err) {
    res.render('base', {
      content: 'role/editRole.ejs',
      alertMsg: err,
      alert: "danger",
      role_id: req.body.role_id
    });
  }
};

