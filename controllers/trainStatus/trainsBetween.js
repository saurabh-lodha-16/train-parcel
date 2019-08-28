import models from '../../models';
import db from '../../models/index.js';
var moment = require('moment');
const Op = db.Sequelize.Op;
import { getCurrCity } from './fillStations';
import { reservationsUrl } from 'twilio/lib/jwt/taskrouter/util';

export async function trainBetween(sCity, dCity) {
    // const sCity = req.body.sCity;
    // const dCity = req.body.dCity;
    let x = moment().format();
    x = x.split('T');
    let time = x[0] + " " + x[1];
    const store = [];
    const trainStatuses = await models.trainStatuses.findAll({ where: { sTime: { [Op.gte]: time }, isRunning: true, sCity: sCity } });
    for (let i = 0; i < trainStatuses.length; i++) {
        store.push(trainStatuses[i].dataValues.trainId);
    }
    const trainIds = [...new Set(store)];
    const answer = [];
    for (let i = 0; i < trainIds.length; i++) {
        let trainId = trainIds[i];
        let temp = await models.trainStatuses.findAll({ where: { sTime: { [Op.gte]: time }, isRunning: true, dCity: dCity, trainId: trainId } });
        for (let j = 0; j < temp.length; j++) {
            answer.push(temp[j].dataValues.trainId);
        }
    }
    let final_answer = [];
    for (let i = 0; i < answer.length; i++) {
        let trainId = answer[i];
        let temp1 = await models.trainStatuses.findAll({ where: { sTime: { [Op.gte]: time }, isRunning: true, sCity: sCity, trainId: trainId } });
        let temp2 = await models.trainStatuses.findAll({ where: { sTime: { [Op.gte]: time }, isRunning: true, sCity: dCity, trainId: trainId } });
        for(let j=0; j<temp1.length; j++){
        final_answer.push({ trainId:trainId, sourceStatusId: temp1[j].dataValues.id, destinationStatusId: temp2[j].dataValues.id });
        }
    }
    if(final_answer.length == 0){
    let msg = 'No trains between stations';
    return msg;
    //change here for 0;
    }
    else{
        return final_answer;
    }
}
