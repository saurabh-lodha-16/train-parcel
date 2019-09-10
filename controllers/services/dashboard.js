import * as models from '../../models'
import { getRole } from './common';

export async function dashboardGet(req, res) {
  let user = req.session.user;
  if (user && req.cookies.user_sid) {

    try {
      let userRole = await getRole(user.id)
      // console.log(userRole, '==============')
      if (userRole == 'Manager') {
        let curr_office = await models.offices.findOne({
          where: {
            userId: user.id
          }
        })
        // console.log(curr_office)

        let statuses = await models.statuses.findAll()

        if (curr_office) {
          let pendingPackages = await models.packages.findAll({
            where: {
              sCity: curr_office.cityId,
              statusId: statuses.filter((status) => {
                return status.type == 'PENDING'
              })[0].id,
            }
          })


          //packages contains scity or dcity == current office city pkgs
          // console.log(pendingPackages)

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
          // console.log(pendingPackages, '--------------------------------------------')


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


          res.render('base', {
            content: 'dashboard',
            completedPackages: completedPackages,
            inTransitPackages: inTransitPackages,
            pendingPackages: pendingPackages,
            userRole: await getRole(user.id)
          })
        } else {
          res.render('base', {
            content: 'dashboard',
            userRole: await getRole(user.id)
          })
        }

      } else {

        let statuses = await models.statuses.findAll()

        let pendingPackages = await models.packages.findAll({
          where: {
            [models.Sequelize.Op.or]: [
              {
                senderUserId: user.id
              },
              {
                rcvrUserId: user.id
              }
            ],
            statusId: statuses.filter((status) => {
              return status.type == 'PENDING'
            })[0].id,
          }
        })


        //packages contains scity or dcity == current office city pkgs
        // console.log(pendingPackages)

        let inTransitPackages = await models.packages.findAll({
          where: {
            [models.Sequelize.Op.or]: [
              {
                senderUserId: user.id
              },
              {
                rcvrUserId: user.id
              }
            ],
            statusId: statuses.filter((status) => {
              return status.type == 'IN-TRANSIT'
            })[0].id,
          }
        })
        // console.log(pendingPackages, '--------------------------------------------')


        let completedPackages = await models.packages.findAll({
          where: {
            [models.Sequelize.Op.or]: [
              {
                senderUserId: user.id
              },
              {
                rcvrUserId: user.id
              }
            ],
            statusId: statuses.filter((status) => {
              return status.type == 'COMPLETED'
            })[0].id,
          }
        })


        res.render('base', {
          content: 'dashboard',
          completedPackages: completedPackages,
          inTransitPackages: inTransitPackages,
          pendingPackages: pendingPackages,
          userRole: await getRole(user.id)
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

