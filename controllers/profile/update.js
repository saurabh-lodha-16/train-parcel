import db from '../../models';
let user = db['users'];

export async function updateUser(userId, name, email, phoneNo) {
  try {
    await user.update(
      {
        name: name,
        email: email,
        mobileNo: phoneNo
      },
      { where: { id: userId } }

    );
    let updatedUser = await user.findOne(
      {
        attribute: ['id', 'name', 'email', 'mobileNo'],
        where: { id: userId }
      });
    return updatedUser;
  } catch (err) {
    throw (err);
  }
}

export async function updateProfile(req, res) {
  try {
    if (req.session.user) {
      if (!(req.body.name && req.body.email && req.body.phoneNo)) {
        res.render('base', {
          content: 'profile/updateProfile.ejs',
          user: req.session.user,
          alertMsg: "One or more blank fields found.",
          alert: "danger"
        });
      }
      if (req.body.phoneNo.length !== 10) {
        res.render('base', {
          content: 'profile/updateProfile.ejs',
          user: req.session.user,
          alertMsg: "Phone number must consist 10 digits.",
          alert: "danger"
        });
      }
      let User = await updateUser(req.session.user.id, req.body.name, req.body.email, req.body.phoneNo);
      req.session.user = User;
      res.render('base', {
        content: 'profile/updateProfile.ejs',
        user: User,
        alertMsg: "Profile successfully updated.",
        alert: "success"
      });
    }
    else {
      res.redirect('/login');
    }
  } catch (err) {
    res.render('base', {
      content: 'profile/updateProfile.ejs',
      user: req.session.user,
      alertMsg: err,
      alert: "danger"
    });
  }
}

export async function renderUpdation(req, res) {
  try {
    if (req.session.user) {
      res.render('base', {
        content: 'profile/updateProfile.ejs',
        user: req.session.user
      });
    } else {
      res.redirect('/login');
    }
  } catch (err) {
    res.send(err);
  }
}
