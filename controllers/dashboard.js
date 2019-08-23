export function dashboardGet(req, res) {
    let user = req.session.user;
    if (user && req.cookies.user_sid) {
        res.render('dashboard', {alert:'primary', alertMsg:`Hello ${user.name}`})
    }else{
        res.redirect('/login')
    }
}
