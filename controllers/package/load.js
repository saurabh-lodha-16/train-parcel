import models from '../../models';
import db from '../../models/index.js';
var moment = require('moment');
const Op = db.Sequelize.Op;
import { getCityName } from '../getCityName';
import { getISTTime } from '../getISTTime';

//serialNo se 
export async function loadPackage(req, res) {
    //parameters are packageId, trainId, sourceStatusID, destinationSourceID
    const sCityTrainStatusId = req.body.sourceStatusId;
    const dCityTrainStatusId = req.body.destinationStatusId;
    const trainId = req.body.trainId;
    const packageId = req.body.packageId;
    console.log(packageId);
    let temp1 = await models.statuses.findOne({ where: { type: 'IN-TRANSIT' } });
    let inTransitId = temp1.dataValues.id;
    const packageDetails = await models.packages.update({trainId:trainId, statusId:inTransitId, sCityTrainStatusId:sCityTrainStatusId, dCityTrainStatusId:dCityTrainStatusId}, 
        {where:{id:packageId}})
    //notify code
        res.send(packageDetails);


}
