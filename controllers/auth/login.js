import * as models from '../../models';

export  function loginGet(req, res){
    res.render('auth/login');
}

export  function loginPost(req, res){
    let email = req.body.email;
    let pwd = req.body.pwd;
    models.users.findOne({
        where: {
            email: email
        }
    }).then(user => {
        console.log(user);
        if (user) {
            if (user.password == pwd) {
                req.session.user = user;
                res.redirect('dashboard/')
            } else {
                res.render('auth/login', {alert: 'danger', alertMsg: 'You have entered wrong credentials!'})
            }
        } else {
            res.render('auth/login', {alert: 'danger', alertMsg: 'You have entered wrong credentials!'})
        }
    });
    // res.render('login');
}