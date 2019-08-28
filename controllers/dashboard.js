import * as models from '../models'

export async function dashboardGet(req, res) {
    let user = req.session.user;
    if (user && req.cookies.user_sid) {

        try {
            let role = 'Manager'
            if (role == 'Manager') {
                let curr_office = await models.offices.findOne({
                    where: {
                        userId: user.id
                    }
                })
                console.log(curr_office)

                let statuses = await models.statuses.findAll()

                if (curr_office) {
                    let pendingPackages = await models.packages.findAll({
                        where: {

                            [models.Sequelize.Op.or]: [
                                {
                                    dCity: curr_office.cityId
                                },
                                {
                                    sCity: curr_office.cityId
                                }
                            ],
                            statusId: statuses.filter((status) => {
                                return status.type == 'PENDING'
                            })[0].id,
                        }
                    })


                    //packages contains scity or dcity == current office city pkgs
                    console.log(pendingPackages)

                    let inTransitPackages = await models.packages.findAll({
                        where: {
                            sCity: curr_office.cityId,
                            [models.Sequelize.Op.or]: [
                                {
                                    dCity: curr_office.cityId
                                },
                                {
                                    sCity: curr_office.cityId
                                }
                            ],
                            statusId: statuses.filter((status) => {
                                return status.type == 'IN-TRANSIT'
                            })[0].id,
                        }
                    })
                    console.log(pendingPackages, '--------------------------------------------')


                    let completedPackages = await models.packages.findAll({
                        where: {
                            sCity: curr_office.cityId,
                            [models.Sequelize.Op.or]: [
                                {
                                    dCity: curr_office.cityId
                                },
                                {
                                    sCity: curr_office.cityId
                                }
                            ],
                            statusId: statuses.filter((status) => {
                                return status.type == 'COMPLETED'
                            })[0].id,
                        }
                    })



                    // outgoingPackages = packages.filter((pkg) => {
                    //     return pkg.sCity == curr_office.cityId
                    // })
                    // incomingPackages = packages.filter((pkg) => {
                    //     return pkg.dCity == curr_office.cityId
                    // })
                    // loadedPackages = packages.filter((pkg) => {
                    //     return pkg.statusId = statuses.filter((status) => {
                    //         return status.type == 'Loaded'
                    //     })[0].id
                    // })
                    // pendingPackages = packages.filter((pkg) => {
                    //     return pkg.statusId = statuses.filter((status) => {
                    //         return status.type == 'Pending'
                    //     })
                    // })

                    // pendingPackages = await models.packages.findAll({
                    //     where: {
                    //         sCity: curr_office.cityId,
                    //         $or: [
                    //             {
                    //                 dCity: {
                    //                     $eq: curr_office.cityId
                    //                 }
                    //             }
                    //         ],
                    //         //status with type pending must be only one
                    //         statusId: statuses.filter((status) => {
                    //             return status.type == 'Pending'
                    //         })[0].id
                    //     }
                    // })


                    res.render('base', {
                        content: 'dashboard',
                        completedPackages: completedPackages,
                        inTransitPackages: inTransitPackages,
                        pendingPackages: pendingPackages
                    })
                } else {
                    res.render('base', {
                        content: 'dashboard',
                    })
                }

            } else {
                res.render('base', {
                    content: 'dashboard',
                })
            }
        } catch (e) {
            res.render('base', {
                content: 'dashboard',
                alert: 'danger',
                alertMsg: 'Exception: ' + e
            })
        }

    } else {
        res.render('auth/login', { alert: 'danger', alertMsg: 'Please Login first!' });
    }
}


export function dashboardPost(req, res) {

}
