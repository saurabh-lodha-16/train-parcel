import db from '../../models';

let users = db['users'];

function checkPassword(str) {
  let re = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
  return re.test(str);
}

export function renderChangePassword(req, res) {
  try {
    if (req.session.user) {
      res.render('auth/changePassword.ejs');
    } else {
      res.redirect('/login');
    }
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
    if (user) {
      let oldPassword = req.body.oldPassword;
      let newPassword = req.body.newPassword;
      let reNewPassword = req.body.reNewPassword;
      if(!(checkPassword(newPassword) && checkPassword(reNewPassword))) {
        res.render('auth/changePassword.ejs', {
          alertMsg: `Password should contain at least one lowercase letter, one uppercase letter,
          one number and 8 other letters.`,
          alert: "danger"
        });
      }
      if(!(oldPassword && newPassword && reNewPassword)) {
        res.render('auth/changePassword.ejs', {
          alertMsg: "One or more blank fields found.",
          alert: "danger"
        });
      }
      if (newPassword !== reNewPassword) {
        res.render('auth/changePassword.ejs', {
          alertMsg: "Passwords didn't match",
          alert: "danger"
        });
      }
      if (user.password === oldPassword) {
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
