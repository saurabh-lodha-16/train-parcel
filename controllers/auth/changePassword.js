import db from '../../models';
import { getRole } from '../common';
const bcrypt = require('bcrypt')
const users = db['users'];

function checkPassword(str) {
  let re = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
  return re.test(str);
}

export async function renderChangePassword(req, res) {
  try {
    let user = req.session.user
    if (user) {
      res.render('base',{
        content: 'auth/changePassword.ejs',
        userRole: await getRole(user.id)
      });
    } else {
      res.redirect('/login');
    }
  } catch (err) {
    res.send(err);
  }
}

async function updatePassword(userId, password) {
  try {
    let hashPwd = bcrypt.hashSync(password, 10);
    let updatedInstance = await users.update(
      { password: hashPwd },
      { where: { id: userId } }
    );
  } catch (err) {
    throw (err);
  }
}

export async function changePassword(req, res) {
  try {

    let user = req.session.user;
    if (user) {
      let oldPassword = req.body.oldPassword;
      let newPassword = req.body.newPassword;
      let reNewPassword = req.body.reNewPassword;

      if (!(checkPassword(newPassword) && checkPassword(reNewPassword))) {
        res.render('base', {
          content: 'auth/changePassword.ejs',
          alertMsg: `Password should contain at least one lowercase letter, one uppercase letter,
          one number and 8 other letters.`,
          alert: "danger"
        });
      }
      if (!(oldPassword && newPassword && reNewPassword)) {
        res.render('base', {
          content: 'auth/changePassword.ejs',
          alertMsg: "One or more blank fields found.",
          alert: "danger"
        });
      }
      if ((oldPassword === newPassword)) {
        res.render('base', {
          content: 'auth/changePassword.ejs',
          alertMsg: "New Password must be different from Old Password.",
          alert: "danger"
        });
      }
      if (newPassword !== reNewPassword) {
        res.render('base', {
          content: 'auth/changePassword.ejs',
          alertMsg: "Passwords didn't match",
          alert: "danger"
        });
      }
      await bcrypt.compare(oldPassword, user.password, async function (err, result) {
        if (result) {
          await updatePassword(user.id, newPassword);
          res.render('base', {
            content: 'auth/changePassword.ejs',
            alertMsg: "Password successfully updated.",
            alert: "success"
          });

        } else {
          res.render('base', {
            content: 'auth/changePassword.ejs',
            alertMsg: "Old password is incorrect.",
            alert: "danger"
          });
        }
      })
    } else {
      res.redirect('/login');
    }
  } catch (err) {
    res.render('base', {
      content: 'auth/changePassword.ejs',
      alertMsg: err,
      alert: "danger"
    });
  }
}

