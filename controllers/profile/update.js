import db from '../../models';
import { getRole } from '../common';
import { usersPut } from '../users/update';
import { changePassword } from '../auth/changePassword';
let user = db['users'];

// export async function updateUser(userId, name, email) {
//   try {
//     await user.update(
//       {
//         name: name,
//         email: email,
//       },
//       { where: { id: userId } }

//     );
//     let updatedUser = await user.findOne(
//       {
//         attribute: ['id', 'name', 'email', 'mobileNo'],
//         where: { id: userId }
//       });
//     return updatedUser;
//   } catch (err) {
//     throw (err);
//   }
// }

export async function updateProfile(req, res) {
  let loggedUser = req.session.user
  if (loggedUser) {
    try {
      let name = req.body.name
      let email = req.body.email
      let oldPassword = req.body.oldPassword;
      let newPassword = req.body.newPassword;
      let reNewPassword = req.body.reNewPassword;
      if (name && email) {
        let User = await usersPut(loggedUser.id, {
          name: req.body.name,
          email: req.body.email
        });
        req.session.user = User;
        res.render('base', {
          content: 'profile/updateProfile.ejs',
          user: User,
          alertMsg: "Profile successfully updated.",
          alert: "success",
          userRole: await getRole(loggedUser.id)
        });

      } else if (oldPassword && newPassword && reNewPassword) {
        let res1 = changePassword(loggedUser, oldPassword, newPassword, reNewPassword)
        if (res) {
          req.session.user = res1
          res.render('base', {
            content: 'auth/changePassword.ejs',
            alertMsg: "Password changed successfully",
            alert: "success",
            userRole: await getRole(loggedUser.id)
          });
        } else {
          throw 'Some problem has occured during password change.'
        }
      } else {
        res.render('base', {
          content: 'profile/updateProfile.ejs',
          user: loggedUser,
          alertMsg: "One or more blank fields found.",
          alert: "danger",
          userRole: await getRole(loggedUser.id)
        });
      }

    } catch (err) {
      res.render('base', {
        content: 'profile/updateProfile.ejs',
        user: req.session.user,
        alertMsg: err,
        alert: "danger",
        userRole: await getRole(loggedUser.id)
      });
    }
  }
  else {
    res.redirect('/login');
  }
}

export async function renderUpdation(req, res) {
  let loggedUser = req.session.user
  try {
    if (req.session.user) {
      res.render('base', {
        content: 'profile/updateProfile.ejs',
        user: loggedUser,
        userRole: await getRole(loggedUser.id)
      });
    } else {
      res.redirect('/login');
    }
  } catch (err) {
    res.send(err);
  }
}

