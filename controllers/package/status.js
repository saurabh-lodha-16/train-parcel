import models from '../../models';
import db from '../../models/index.js';
var moment = require('moment');
const Op = db.Sequelize.Op;
import { getCurrCity } from '../trainStatus/fillStations';
import { getCityName } from '../getCityName';
import { getISTTime } from '../getISTTime';

//serialNo se 
export async function getPackageStatus(serial_no) {
    let temp2 = await models.statuses.findOne({ where: { type: 'COMPLETED' } });
    let completedId = temp2.dataValues.id;
    let packageDetails = await models.packages.findOne({ where: { serial_no: serial_no } });
    let statusId = packageDetails.dataValues.statusId;
    let trainId = packageDetails.dataValues.trainId;
    let sCity = packageDetails.dataValues.sCity;
    let dCity = packageDetails.dataValues.dCity;
    sCity = await getCityName(sCity);
    dCity = await getCityName(dCity);
    let dCityTrainStatusId = packageDetails.dataValues.dCityTrainStatusId;
    let sCityTrainStatusId = packageDetails.dataValues.sCityTrainStatusId;

    if (statusId == completedId) {
        console.log('Your package has reached')
    }
    else {
        var x = moment().format();
        x = x.split('T');
        var time = x[0] + " " + x[1];
        const answer = await models.trainStatuses.findAll({ where: { trainId: trainId } });
        const result = [];
        for (let i = 0; i < answer.length; i++) {
            let x = await getISTTime(answer[i].dataValues.sTime);
            let city_name = await getCityName(answer[i].dataValues.sCity);
            let trainStatusId = answer[i].dataValues.id;
            result.push({ trainStatusId: trainStatusId, city_name: city_name, time: x, isLive: false });
        }
        let y = await getISTTime(answer[answer.length - 1].dataValues.dTime);
        let city_name = await getCityName(answer[answer.length - 1].dataValues.dCity);
        let trainStatusId = answer[answer.length - 1].dataValues.id;
        result.push({ trainStatusId: trainStatusId, city_name: city_name, time: y, isLive: false });
        let curr_city = await getCurrCity(trainId);
        curr_city = await getCityName(curr_city);

        let sIndex, dIndex, liveIndex;
        for (let i = 0; i < result.length; i++) {
            if (result[i].trainStatusId == sCityTrainStatusId) {
                sIndex = i;
            }
            if (result[i].trainStatusId == dCityTrainStatusId) {
                dIndex = i;
            }
        }
        const final_answer = result.slice(sIndex, dIndex+1);
        for (let i = 0; i < final_answer.length; i++) {
            if (final_answer[i].city_name == curr_city) {
                liveIndex = i;
            }
        }
        if(liveIndex === undefined){
            console.log(`Your train hasn't started yet`);
        }else{
        final_answer[liveIndex].isLive = true;
        }
        console.log(final_answer);
        return final_answer
    }
}
