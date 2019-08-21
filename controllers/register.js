export  function registerGet(req, res){
    res.render('register');
}


export function registerPost(req, res){
    let username = req.body.id;
    let pwd = req.body.pwd;
    let rpwd = req.body.rpwd;

    if (pwd == rpwd) {
        // User.create({
        //     email: username,
        //     username: username,
        //     password: pwd,
        //     uuid: uuidv4()
        // }).then(user => {
        //     res.write('User with ' + username + ' has been added successfully!');
        //     res.end();
        // });
    } else {
        res.write('Passwords didn\'t match!');
        res.end();
    }
}