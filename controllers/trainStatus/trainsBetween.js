import models from '../../models';
import db from '../../models/index.js';
var moment = require('moment');
const Op = db.Sequelize.Op;
import { getCurrCity } from './fillStations';

export async function trainBetween(req, res) {
    const sCity = req.body.sCity;
    const dCity = req.body.dCity;

    const trainDetails = await models.trains.findAll({ where: { isActive: true } });
    const trainIds = [];
    for (let i = 0; i < trainDetails.length; i++) {
        trainIds.push(trainDetails[i].dataValues.id);
    }
    const answer = [];
    for (let i = 0; i < trainIds.length; i++) {
        const trainId = trainIds[i];
        const temp = await models.trainStatuses.findAll({ where: { trainId: trainId, isRunning: true } });
        const start = [];
        const end = [];
        for (let j = 0; j < temp.length; j++) {
            start.push(temp[j].dataValues.sCity);
            end.push(temp[j].dataValues.dCity);
        }
        console.log(start);
        if(start.includes(sCity) && end.includes(dCity)){
            answer.push(trainId);
        }
    }
res.send(answer);

}