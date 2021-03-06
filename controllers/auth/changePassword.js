import { getRole } from '../services/common'
import { usersPut } from '../users/update'
import { redirectWithMsg } from '../services/common'
const bcrypt = require('bcrypt')

function checkPassword(str) {
  let re = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/
  return re.test(str)
}

export async function renderChangePassword(req, res) {
  try {
    let user = req.session.user
    if (user) {
      res.render('base', {
        content: 'auth/changePassword.ejs',
        userRole: await getRole(user.id)
      })
    } else {
      redirectWithMsg('/login', req, res, 'danger', 'Please Login first!')
    }
  } catch (err) {
    res.send(err)
  }
}

async function updatePassword(userId, password) {
  try {
    let hashPwd = bcrypt.hashSync(password, 10)
    let updatedInstance = await usersPut(userId, {
      password: hashPwd
    })
    return updatedInstance
  } catch (err) {
    throw (err)
  }
}

export async function changePassword(user, oldPassword, newPassword, reNewPassword) {
  try {
    if (!(checkPassword(newPassword) && checkPassword(reNewPassword))) {
      res.render('base', {
        content: 'auth/changePassword.ejs',
        alertMsg: `Password should contain at least one lowercase letter, one uppercase letter,
            one number and 8 other letters.`,
        alert: "danger",
        userRole: await getRole(user.id)
      })
    }
    if (!(oldPassword && newPassword && reNewPassword)) {
      throw "One or more blank fields found."
    }
    if ((oldPassword === newPassword)) {
      throw "New Password must be different from Old Password."
    }
    if (newPassword !== reNewPassword) {
      throw "Passwords didn't match"
    }
    await bcrypt.compare(oldPassword, user.password, async function (err, result) {
      if (result) {
        let updatedInstance = await updatePassword(user.id, newPassword)
        return updatedInstance
      } else {
        throw "Old password is incorrect."
      }
    })
  } catch (err) {
    throw err
  }
}

