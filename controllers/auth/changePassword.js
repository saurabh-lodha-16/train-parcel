import db from '../../models';

let users = db['users'];

export function renderChangePassword(req, res) {
  try {
    res.render('auth/changePassword.ejs');
  } catch (err) {
    res.send(err);
  }
}

async function updatePassword(userId, password) {
  try {
    let updatedInstance = await users.update(
      { password: password },
      { where: { id: userId } }
    );
  } catch (err) {
    throw (err);
  }
}

export async function changePassword(req, res) {
  try {
    let user = req.session.user;
    let userId;
    if (user) {
      userId = user.id;
    }
    //let userId = 'bafd904a-8425-4e0d-8e95-c6ea531d76c8';
    //req.cookies.userId = true;
    if (user && req.cookies.userId) {
      let oldPassword = req.body.oldPassword;
      let newPassword = req.body.newPassword;
      let reNewPassword = req.body.reNewPassword;
      if (newPassword !== reNewPassword) {
        res.render('auth/changePassword.ejs', {
          alertMsg: "Passwords don't match",
          alert: "danger"
        });
      }
      let retrievedUser = await users.findOne(
        { attributes: ['password'] },
        { where: { userId: userId } }
      );
      if (retrievedUser.password === oldPassword) {
        updatePassword(userId, newPassword);
        res.render('auth/changePassword.ejs', {
          alertMsg: "Password successfully updated.",
          alert: "success"
        });
      } else {
        res.render('auth/changePassword.ejs', {
          alertMsg: "Old password is incorrect.",
          alert: "danger"
        });
      }
    } else {
      res.redirect('/login');
    }
  } catch (err) {
    res.render('auth/changePassword.ejs', {
      alertMsg: err,
      alert: "danger"
    });
  }
}
