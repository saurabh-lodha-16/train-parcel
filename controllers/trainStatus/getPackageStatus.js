import models from '../../models';
import db from '../../models/index.js';
var moment = require('moment');
const Op = db.Sequelize.Op;
import { getCurrCity } from './fillStations';

//serialNo se 
export async function getPackageStatus(req, res) {
    const serial_no = req.body.serial_no;
    let temp1 = await models.statuses.findOne({ where: { type: 'PENDING' } });
    let pendingId = temp1.dataValues.id;
    let temp2 = await models.statuses.findOne({ where: { type: 'COMPLETED' } });
    let completedId = temp2.dataValues.id;
    var packageDetails = await models.packages.findOne({ where: { serial_no: serial_no } });
    var statusId = packageDetails.dataValues.statusId;
    var trainId = packageDetails.dataValues.trainId;
    var sCity = packageDetails.dataValues.sCity;
    var dCity = packageDetails.dataValues.dCity;

    if (statusId == completedId) {
        console.log('Your package has reached')
    }
    else {
        //show trail
        var x = moment().format();
        x = x.split('T');
        var time = x[0] + " " + x[1];
        const answer = await models.trainStatuses.findAll({ where: { trainId: trainId, isRunning: true } });
        const result = [];
        for (let i = 0; i < answer.length; i++) {
            let y = answer[i].dataValues.sTime.toUTCString();
            let myDate = new Date(y);
            let x = myDate.toLocaleString();
            result.push({ city_id: answer[i].dataValues.sCity, time: x, isLive: false });
        }
        let temp = answer[answer.length - 1].dataValues.dTime.toUTCString();
        let myDate = new Date(temp);
        let y = myDate.toLocaleString();

        result.push({ city_id: answer[answer.length - 1].dataValues.dCity, time: y, isLive: false });
        console.log(result);
        const curr_city = await getCurrCity(trainId);
        let sIndex, dIndex, liveIndex;
        for (let i = 0; i < result.length; i++) {
            if (result[i].city_id == sCity) {
                sIndex = i;
            }
            if (result[i].city_id == dCity) {
                dIndex = i;
            }
            if (result[i].city_id == curr_city) {
                liveIndex = i;
            }
        }
        const final_answer = result.slice(sIndex, dIndex);
        final_answer[liveIndex].isLive = true;
        res.send(final_answer);
    }
}