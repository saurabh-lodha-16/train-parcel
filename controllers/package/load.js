import models from '../../models';
import db from '../../models/index.js';
var moment = require('moment');
const Op = db.Sequelize.Op;
const sequelize = require('sequelize')
import { getCityName } from '../getCityName';
import { getISTTime } from '../getISTTime';
import { trainBetween } from '../trainStatus/trainsBetween';

//serialNo se 
export async function loadPackage(packageId, sCityTrainStatusId, dCityTrainStatusId, trainId) {
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




    let temp1 = await models.statuses.findOne({ where: { type: 'IN-TRANSIT' } });
    let inTransitId = temp1.dataValues.id;
    const packageDetails = await models.packages.update({ trainId: trainId, statusId: inTransitId, sCityTrainStatusId: sCityTrainStatusId, dCityTrainStatusId: dCityTrainStatusId },
        { where: { id: packageId } })
    return packageDetails;
}

export async function loadPackagePost(req, res){
    try{
        let select_date = req.body.select_date
        let serial_no = req.body.package_serial_no
            if (select_date) {
                let trainStatusesList = await trainBetween(serial_no, select_date)
                res.render('base', {
                    content: 'package/selectTrainStatus',
                    trainStatuses: trainStatusesList,
                    package_serial_no: req.body.serialNo
                })
            } else {
                res.render('base', {
                    content: 'package/selectTrainStatus',
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