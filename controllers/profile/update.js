import db from '../../models';
import { getRole, redirectWithMsg } from '../services/common';
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
        redirectWithMsg('/dashboard', req, res, 'success', "Profile successfully updated.")

      } else if (oldPassword && newPassword && reNewPassword) {
        let res1 = await changePassword(loggedUser, oldPassword, newPassword, reNewPassword)

        // req.session.user = res1
        redirectWithMsg('/password',req,res,'success',"Password successfully updated.")
        

      } else {
        redirectWithMsg('/profiles',req,res,'danger',"One or more blank fields found.")

        
      }
    } catch (err) {
      redirectWithMsg('/dashboard',req,res,'danger',err)

      
    }
  }
  else {
    redirectWithMsg('/login', req, res, 'danger', 'Please Login first!')
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
      redirectWithMsg('/login', req, res, 'danger', 'Please Login first!')
    }
  } catch (err) {
    res.send(err);
  }
}

