import models from '../../models';
import db from '../../models/index.js';
var moment = require('moment');
const Op = db.Sequelize.Op;
import { getCurrCity } from '../trainStatus/fillStations';

//serialNo se 
export async function getPackageStatus(serial_no) {
    let temp2 = await models.statuses.findOne({ where: { type: 'COMPLETED' } });
    let completedId = temp2.dataValues.id;
    let packageDetails = await models.packages.findOne({ where: { serial_no: serial_no } });
    let statusId = packageDetails.dataValues.statusId;
    let trainId = packageDetails.dataValues.trainId;
    let sCity = packageDetails.dataValues.sCity;
    let dCity = packageDetails.dataValues.dCity;

    if (statusId == completedId) {
        console.log('Your package has reached')
    }
    else {

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
        console.log(final_answer);
        return final_answer
    }
}
