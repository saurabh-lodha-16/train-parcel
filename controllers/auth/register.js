import * as models from '../../models';

export  function registerGet(req, res){
    res.render('auth/register');
}


export function registerPost(req, res){
    let email = req.body.email;
    let name = req.body.name;
    let phone = req.body.phone;
    let pwd = req.body.pwd;
    let rpwd = req.body.rpwd;

    if (pwd == rpwd) {
        models.users.create({
            name: name,
            mobileNo: phone,
            email: email,
            password: pwd,
            
        }).then(user => {
            // create a default role for user
            res.write('User with ' + email + ' has been added successfully!');
            res.end();
        });
    } else {
        res.write('Passwords didn\'t match!');
        res.end();
    }
}

