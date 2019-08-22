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
                res.write('Hello ' + user.name);
                res.end();
            } else {
                res.write('You have entered a wrong password!');
                res.end();
            }
        } else {
            res.write('User with ' + email + ' doesn\'t exist');
            res.end();
        }
    });
    // res.render('login');
}