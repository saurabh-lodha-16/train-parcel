import * as models from '../../models';
const bcrypt = require('bcrypt')
export function loginGet(req, res) {
	let user = req.session.user
	if (!user) {
		res.render('auth/login');
	} else {
		res.redirect('/dashboard')
	}


}

export function loginPost(req, res) {
    let email = req.body.email;
    let pwd = req.body.pwd;
    try {
        models.users.findOne({
            where: {
                email: email
            }
        }).then(user => {
            //console.log(user);
            if (user) {
                bcrypt.compare(pwd, user.password, function (err, result) {
                    if (result) {
                        // Passwords match
                        req.session.user = user;
                        res.redirect('/dashboard')
                    } else {
                        // Passwords don't match
                        res.render('auth/login', { alert: 'danger', alertMsg: 'You have entered wrong credentials!' })
                    }
                });

            } else {
                res.render('auth/login', { alert: 'danger', alertMsg: 'You have entered wrong credentials!' })
            }
        });
    } catch (e) {
        res.render('auth/login', { alert: 'danger', alertMsg: `Exception: ${e.message}` })
    }


    // res.render('login');
}



export function logoutGet(req, res) {
	if (req.session) {
		req.session.destroy((err) => {
			if (err) {
				res.write(err)
				res.end()
			} else {
				res.redirect('/dashboard')
			}
		})
	}
}

