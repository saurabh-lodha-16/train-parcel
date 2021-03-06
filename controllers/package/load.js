import models from '../../models'
import { trainBetween } from '../trainStatus/trainsBetween'
import { sendWAmsg, getRole } from '../services/common'

export async function loadPackage(serialNo, sCityTrainStatusId, dCityTrainStatusId, trainId) {
  try {
    let temp1 = await models.statuses.findOne({ where: { type: 'IN-TRANSIT' } })
    let inTransitId = temp1.dataValues.id
    const packageDetails = await models.packages.update({ trainId: trainId, statusId: inTransitId, sCityTrainStatusId: sCityTrainStatusId, dCityTrainStatusId: dCityTrainStatusId },
      { where: { serial_no: serialNo } })
    const details = await models.packages.findOne({ where: { serial_no: serialNo } })
    let senderUser = await models.users.findOne({ where: { id: details.dataValues.senderUserId } })
    let train = await models.trains.findOne({ where: { id: trainId } })
    sendWAmsg(senderUser.mobileNo, `Your Package ${serialNo} has been loaded in the train ${train.trainNo} ${train.name}`)
    return packageDetails
  }
  catch (e) {
    return e
  }
}

export async function loadPackageGet(req, res) {
  try {
    let user = req.session.user
    let selectDate = req.query.selectDate
    let serialNo = req.query.serialNo
    if (user) {
      if (selectDate) {
        let trainStatusesList = await trainBetween(serialNo, selectDate)
        res.render('base', {
          content: 'package/selectTrainStatus',
          trainStatuses: trainStatusesList,
          serialNo: serialNo,
          userRole: await getRole(user.id)
        })
      } else if (serialNo) {
        res.render('base', {
          content: 'package/selectTrainStatus',
          serialNo: serialNo,
          userRole: await getRole(user.id)
        })
      } else {
        res.render('base', {
          content: 'package/load',
          userRole: await getRole(user.id)
        })
      }
    } else {
      res.redirect('/login')
    }

  } catch (e) {
    console.log(e);
  }

}

