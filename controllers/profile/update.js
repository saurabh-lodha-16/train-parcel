import db from '../../models';
let user = db['users'];

export async function updateUser(userId, name, email   ) {
  try {
    await user.update(
      {
        name: name,
        email: email,
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
      if (!(req.body.name && req.body.email)) {
        res.render('base', {
          content: 'profile/updateProfile.ejs',
          user: req.session.user,
          alertMsg: "One or more blank fields found.",
          alert: "danger"
        });
      }
      let User = await updateUser(req.session.user.id, req.body.name, req.body.email);
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
