import db from '../../models';
let roles = db['roles'];

export async function renderRolePage(req, res) {
  try {
    let roleArray = await roles.findAll({
      attributes: ['id', 'name', 'level']
    });
    res.render('base', {
      content: 'role/index.ejs',
      rolesArray: roleArray
  })

  } catch (err) {
    res.send(err);
  }
};

export function addRole(req, res) {
  let user = req.session.user;
  if (user && req.cookies.user_sid) {
    res.render('base', {
      content: 'role/addRole',
    })
  } else {
    res.render('auth/login', { alert: 'danger', alertMsg: 'Please Login first!' });
  } 
};

export async function addRoleResult(req, res) {
  try {
    let createdRole = await roles.create({
      name: req.body.name,
      level: req.body.level
    });
    console.log("Added role");
    res.render('role/addRole.ejs', {
      alertMsg: "Role successfully added.",
      alert: "success"
    });
  } catch (err) {
    res.render('role/addRole.ejs', {
      alertMsg: err,
      alert: "danger"
    });
  }
};

export function editRole(req, res) {
  try {
    console.log(req.body.role_id);
    res.render('role/editRole.ejs', {
      role_id: req.body.role_id
    });
  } catch (err) {
    res.send(err);
  }
};

export async function editRoleResult(req, res) {
  try {
    await roles.update(
      { name: req.body.name, level: req.body.level },
      { where: { id: req.body.role_id } }
    );
    res.render('role/editRole.ejs', {
      alertMsg: "Role successfully editted.",
      alert: "success"
    });
    

    
  } catch (err) {
    res.render('base', {
      content: 'role/editRole.js',
      alertMsg: err,
      alert: "danger",
      role_id: req.body.role_id
  })
   
  }
};
