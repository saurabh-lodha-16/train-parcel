import db from '../../models';
let user = db['users'];

export async function updateUser(userId, name, email, phoneNo) {
  try {
    let updatedUser = await user.update(
      {
        name: name,
        email: email,
        mobileNo: phoneNo
      },
      { where: { id: userId } }
    );
  } catch (err) {
    throw (err);
  }
}

export async function updateProfile(req, res) {
  try {
    if (req.session.user) {
      let updatedUser = await updateUser(req.session.user.id, req.body.name, req.body.email, req.body.phoneNo);
      res.render('profile/updateProfile.ejs', {
        alertMsg: "Profile successfully updated.",
        alert: "success"
      });
    }
    else {
      res.redirect('/login');
    }
  } catch (err) {
    res.render('profile/updateProfile.ejs', {
      alertMsg: err,
      alert: "danger"
    });
  }
}

export async function renderUpdation(req, res) {
  try {
    if (req.session.user) {
      res.render('profile/updateProfile.ejs');
    } else {
      res.redirect('/login');
    }
  } catch (err) {
    res.send(err);
  }
}