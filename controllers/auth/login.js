import * as models from '../../models';

export function loginGet(req, res) {
    let user = req.session.user
    if (!user) {
        res.render('auth/login');
    }else{
        res.redirect('/dashboard')
    }
    

}

export function loginPost(req, res) {
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
                res.redirect('/dashboard')
            } else {
                res.render('auth/login', { alert: 'danger', alertMsg: 'You have entered wrong credentials!' })
            }
        } else {
            res.render('auth/login', { alert: 'danger', alertMsg: 'You have entered wrong credentials!' })
        }
    });

    // res.render('login');
}



export function logoutGet(req, res){
    if(req.session){
        req.session.destroy((err)=>{
            if(err){
                res.write(err)
                res.end()
            }else{
                res.redirect('/dashboard')
            }
        })
    }
}