import models from '../../models';
import db from '../../models/index.js';
var moment = require('moment');
const Op = db.Sequelize.Op;
import { getCityName } from '../getCityName';
import { getISTTime } from '../getISTTime';

//serialNo se 
export async function loadPackage(packageId, sCityTrainStatusId,dCityTrainStatusId, trainId) {
    //parameters are packageId, trainId, sourceStatusID, destinationSourceID
    let temp1 = await models.statuses.findOne({ where: { type: 'IN-TRANSIT' } });
    let inTransitId = temp1.dataValues.id;
    const packageDetails = await models.packages.update({trainId:trainId, statusId:inTransitId, sCityTrainStatusId:sCityTrainStatusId, dCityTrainStatusId:dCityTrainStatusId}, 
        {where:{id:packageId}})
    return packageDetails;
}


export function loadPackageGet(req, res){
    res.render('base',{
        content: 'package/load'
    })
}