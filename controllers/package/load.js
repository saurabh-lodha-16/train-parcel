import models from '../../models';
import db from '../../models/index.js';
var moment = require('moment');
const Op = db.Sequelize.Op;
const sequelize = require('sequelize')
import { getCityName } from '../getCityName';
import { getISTTime } from '../getISTTime';

//serialNo se 
export async function loadPackage(req, res) {
    //parameters are packageId, trainId, sourceStatusID, destinationSourceID
    // let sCityTrainStatusId = req.body.sourceStatusId;
    // let dCityTrainStatusId = req.body.destinationStatusId;
    // let trainId = req.body.trainId;
    // let packageId = req.body.packageId;
    // console.log(packageId);
    // let temp1 = await models.statuses.findOne({ where: { type: 'IN-TRANSIT' } });
    // let inTransitId = temp1.dataValues.id;
    // const packageDetails = await models.packages.update({trainId:trainId, statusId:inTransitId, sCityTrainStatusId:sCityTrainStatusId, dCityTrainStatusId:dCityTrainStatusId}, 
    //     {where:{id:packageId}})
    //notify code
    // res.send(packageDetails);

try{
    if (req.body.select_date) {
        let selectDate = req.body.select_date
        let trainStatuses = await models.trainStatuses.findAll(
            {
                include: [models.trains],
                attributes: [
                    'id',
                    [sequelize.fn('date_format', sequelize.col('sTime'), '%d-%m-%Y'), 'sTime']
                ], where: {
                    sTime: selecteDate
                }
            })
        res.render('base', {
            content: 'package/selectTrainStatus',
            trainStatuses: trainStatuses,
            package_serial_no: req.body.serialNo
        })
    } else {
        res.render('base', {
            content: 'package/selectTrainStatus',
            trainStatuses: await models.trainStatuses.findAll({ include: [models.trains] }),
            package_serial_no: req.body.serialNo
        })
    }
}catch(e){
    console.log(e);
}

  

}


export function loadPackageGet(req, res) {
    res.render('base', {
        content: 'package/load',
    })
}