import models from '../../models';
import db from '../../models/index.js';
var moment = require('moment');
const Op = db.Sequelize.Op;
const sequelize = require('sequelize')
import { getCityName } from '../getCityName';
import { getISTTime } from '../getISTTime';
import { trainBetween } from '../trainStatus/trainsBetween';
import { sendWAmsg } from '../common';

//serialNo se 
export async function loadPackage(serialNo, sCityTrainStatusId, dCityTrainStatusId, trainId) {
    try {
        let temp1 = await models.statuses.findOne({ where: { type: 'IN-TRANSIT' } });
        let inTransitId = temp1.dataValues.id;
        const packageDetails = await models.packages.update({ trainId: trainId, statusId: inTransitId, sCityTrainStatusId: sCityTrainStatusId, dCityTrainStatusId: dCityTrainStatusId },
            { where: { serial_no: serialNo } })
        const details = await models.packages.findOne({ where: { serial_no: serialNo } });
        let senderUser = await models.users.findOne({ where: { id: details.dataValues.senderUserId } })
        let train = await models.trains.findOne({ where: { id: trainId } })
        // console.log(senderUserId);
        // notify user thru whatsapp
        sendWAmsg(senderUser.mobileNo, `Your Package ${serialNo} has been loaded in the train ${train.trainNo} ${train.name}`)
        return packageDetails;
    }
    catch (e) {
        return e;
    }
}

export async function loadPackagePost(req, res) {

}

export async function loadPackageGet(req, res) {
    try {
        let selectDate = req.query.selectDate
        let serialNo = req.query.serialNo
        // console.log(serialNo, '===============================================================')
        if (selectDate) {
            let trainStatusesList = await trainBetween(serialNo, selectDate)
            // console.log('=============================', trainStatusesList.length)
            res.render('base', {
                content: 'package/selectTrainStatus',
                trainStatuses: trainStatusesList,
                serialNo: serialNo
            })
        } else if (serialNo) {
            res.render('base', {
                content: 'package/selectTrainStatus',
                serialNo: serialNo
            })
        } else {
            res.render('base', {
                content: 'package/load'
            })
        }
    } catch (e) {
        console.log(e);
    }

}

