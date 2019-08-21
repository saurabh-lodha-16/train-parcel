export  function loginGet(req, res){
    res.render('login');
}

export  function loginPost(req, res){
    let username = req.body.id;
    let pwd = req.body.pwd;
    // User.findOne({
    //     where: {
    //         username: username
    //     }
    // }).then(user => {
    //     console.log(user);
    //     if (user.length == 1) {
    //         if (user[0].password == pwd) {
    //             res.write('Hello ' + user[0].username);
    //             res.end();
    //         } else {
    //             res.write('You have entered a wrong password!');
    //             res.end();
    //         }
    //     } else if (user.length > 1) {
    //         res.write('Multiple users returned');
    //         res.end();
    //     } else {
    //         res.write('User with ' + username + ' doesn\'t exist');
    //         res.end();
    //     }
    // });
    res.render('login');
}