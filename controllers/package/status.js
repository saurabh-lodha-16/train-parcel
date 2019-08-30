import models from '../../models';
import db from '../../models/index.js';
import { getCurrCity } from '../trainStatus/fillStations';
import { getCityName } from '../getCityName';
import { getISTTime } from '../getISTTime';
const moment = require('moment');
const Op = db.Sequelize.Op;

//serialNo se 
export async function getPackageStatus(serial_no) {
    let temp2 = await models.statuses.findOne({ where: { type: 'COMPLETED' } });
    let completedId = temp2.dataValues.id;
    let temp3 = await models.statuses.findOne({ where: { type: 'PENDING' } });
    let pendingId = temp3.dataValues.id;
    let packageDetails = await models.packages.findOne({ where: { serial_no: serial_no } });
    if (packageDetails === null) {
        throw 'No package found with this serial id';
    }
    let statusId = packageDetails.dataValues.statusId;
    if (statusId == pendingId) {
        let final_answer = [];
        let msg;
        msg = 'Your package is yet to be loaded';
        final_answer['msg'] = msg;
        console.log(final_answer);
        return final_answer;
    }
    else {
        let trainId = packageDetails.dataValues.trainId;
        let sCity = packageDetails.dataValues.sCity;
        let dCity = packageDetails.dataValues.dCity;
        sCity = await getCityName(sCity);
        dCity = await getCityName(dCity);
        let dCityTrainStatusId = packageDetails.dataValues.dCityTrainStatusId;
        let sCityTrainStatusId = packageDetails.dataValues.sCityTrainStatusId;

        let x = moment().format();
        x = x.split('T');
        let time = x[0] + " " + x[1];
        let answer = await models.trainStatuses.findAll({ where: { trainId: trainId } });
        let result = [];
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
        let final_answer = result.slice(sIndex, dIndex + 1);
        for (let i = 0; i < final_answer.length; i++) {
            if (final_answer[i].city_name == curr_city) {
                liveIndex = i;
            }
        }
        let msg;
        final_answer = removeDuplicates(final_answer, 'city_name');
        if (statusId == completedId) {
            final_answer[final_answer.length - 1].isLive = true;
            final_answer.push('Your package has reached');
            console.log(final_answer);
            return final_answer;
        }
        else if (liveIndex == undefined) {
            final_answer.push('Your package is loaded and will soon start');
            console.log(final_answer);
            return final_answer

        }
        else {
            final_answer[liveIndex].isLive = true;
            final_answer.push('Your package is on its way');
            return final_answer
        }
    }
}

function removeDuplicates(myArr, prop) {
    return myArr.filter((obj, pos, arr) => {
        return arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos;
    });
}

