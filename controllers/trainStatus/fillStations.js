import db from '../../models/index.js';
import models from '../../models';
const City = db.cities;
const Train = db.trains;
const request = require('request');
const moment = require('moment');
const Op = db.Sequelize.Op;
const cron = require('node-cron');
import { getISTTime } from '../services/getISTTime';

export async function fillStations(req, res) {
    request.get("http://indianrailapi.com/api/v2/livetrainstatus/apikey/c0298692ea871da8221f1df1cb24e2cc/trainnumber/17031/date/20190904/",
        async (error, response, body) => {
            if (error) {
                return console.dir(error);
            }
            else {
                let obj = JSON.parse(body);
                let stations = obj.TrainRoute;
                let date = new Date();
                let date1 = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
                let inc = 0;
                for (let i = 0; i < stations.length; i++) {
                    if (i == stations.length - 1) {
                        let source = stations[i];
                        let destination = stations[i];
                        let sourceCity = source.StationName;
                        let temp1 = await City.findOne({ where: { name: sourceCity } });
                        let sCity = temp1.dataValues.id;
                        let destcity = destination.StationName;
                        let temp2 = await City.findOne({
                            where: { name: destcity }
                        })
                        let dCity = temp2.dataValues.id;
                        let sourceDayNumber = source.Day;
                        let destDayNumber = destination.Day;
                        let sourceDay, destDay;
                        if (sourceDayNumber == destDayNumber) {
                            sourceDay = date1;
                            destDay = date1;
                        }
                        else {
                            sourceDay = date1;
                            date1 = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + (date.getDate() + 1);
                            destDay = date1;
                        }
                        let temp3 = await Train.findOne({ where: { trainNo: 17031 } })
                        let trainId = temp3.dataValues.id;
                        let sTime = sourceDay + " " + source.ActualArrival + "+05:30";
                        let dTime = destDay + " " + destination.ActualArrival + "+05:30";

                        let answer = { trainId: trainId, date: date1, sCity: sCity, dCity: dCity, sTime: sTime, dTime: dTime };
                        await models.trainStatuses.create(answer);
                    }
                    else {
                        let source = stations[i];
                        let destination = stations[i + 1];
                        let sourceCity = source.StationName;
                        let destcity = destination.StationName;
                        if (sourceCity == "") {
                            sourceCity = "Lohgaon";
                        }
                        if (destcity == "") {
                            destcity = "Lohgaon"
                        }

                        let temp1 = await City.findOne({ where: { name: sourceCity } });
                        let sCity = temp1.dataValues.id;
                        let temp2 = await City.findOne({
                            where: { name: destcity }
                        })
                        let dCity = temp2.dataValues.id;
                        let sourceDayNumber = source.Day;
                        let destDayNumber = destination.Day;
                        let sourceDay, destDay;
                        if (sourceDayNumber == destDayNumber) {
                            //same day dono jagah;
                            sourceDay = date1;
                            destDay = date1;
                        }
                        else {
                            sourceDay = date1;
                            date1 = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + (date.getDate() + 1);
                            destDay = date1;
                        }
                        // console.log(sourceDayNumber + " " + destDayNumber);

                        let temp3 = await Train.findOne({ where: { trainNo: 17031 } })
                        let trainId = temp3.dataValues.id;
                        let sTime = sourceDay + " " + source.ActualDeparture + "+05:30";
                        let dTime = destDay + " " + destination.ActualArrival + "+05:30";

                        let answer = { trainId: trainId, date: date1, sCity: sCity, dCity: dCity, sTime: sTime, dTime: dTime };
                        await models.trainStatuses.create(answer);
                    }
                }
                res.send('Success');

            }
        });
}


export async function trainStatusCron() {
    const trainDetails = await models.trainStatuses.findAll({ where: { isRunning: 'true' } });
    let store = [];
    for (let i = 0; i < trainDetails.length; i++) {
        store.push(trainDetails[i].dataValues.trainId);
    }
    const trainIds = [...new Set(store)]

    cron.schedule('*/15 * * * *', async () => {
        for (let i = 0; i < trainIds.length; i++) {
            let trainId = trainIds[i];
            let start = await models.trainStatuses.findOne({ where: { trainId: trainId } });
            let sourceCityId = start.dataValues.sCity;
            let curr_city = sourceCityId;
            let now_city = await getCurrCity(trainId);
            if (now_city) {
                if (curr_city != now_city) {
                    curr_city = now_city;
                    let temp1 = await models.statuses.findOne({ where: { type: 'IN-TRANSIT' } });
                    let inTransitId = temp1.dataValues.id;
                    let temp2 = await models.statuses.findOne({ where: { type: 'COMPLETED' } });
                    let completedId = temp2.dataValues.id;
                    const toBeUpdated = await models.packages.findAll({ where: { trainId: trainId, dCity: curr_city, statusId: inTransitId, isActive: true } });
                    if (toBeUpdated.length > 0) {
                        const updatedPackages = await models.packages.update({ statusId: completedId },
                            {
                                where: { trainId: trainId, dCity: curr_city, statusId: inTransitId, isActive: true },
                                returning: true,
                                plain: true
                            })
                        if (updatedPackages) {
                            // console.log(updatedPackages);
                        }
                    }
                    else {
                        console.log('No packages to be delivered at this station');
                    }
                }
            }
            let temp1 = await models.statuses.findOne({ where: { type: 'IN-TRANSIT' } });
            let inTransitId = temp1.dataValues.id;
            let pastPackages = await models.packages.findAll({ where: { statusId: inTransitId } });
            let x = moment().format();
            x = x.split('T');
            let timeTemp = x[0] + " " + x[1];
            let time1 = timeTemp.split(' ');
            let date = time1[0].split('-');
            date = parseInt(date[0]) + '-' + parseInt(date[1]) + '-' + parseInt(date[2]);
            let time = date + ' ' + time1[1];
            if (pastPackages) {
                for (let i = 0; i < pastPackages.length; i++) {
                    let id = pastPackages[i].dataValues.id;
                    let trainStatusId = pastPackages[i].dataValues.dCityTrainStatusId;
                    let trainStatus = await models.trainStatuses.findOne({ where: { id: trainStatusId } });
                    if (trainStatus) {
                        let timeToCompare = await getISTTime(trainStatus.dataValues.dTime);
                        let store = timeToCompare.split(',');
                        let date = store[0].split('/');
                        date = date[2] + '-' + date[0] + '-' + date[1] + ' ';
                        let tempTime = store[1] + '+05:30';
                        let final = date + tempTime
                        if (final < time) {
                            let temp2 = await models.statuses.findOne({ where: { type: 'COMPLETED' } });
                            let completedId = temp2.dataValues.id;
                            let changes = await models.packages.update({ statusId: completedId }, { where: { id: id } });
                        }
                    }
                }
            }



            let temp = await models.cities.findOne({ where: { id: curr_city } });
            let city_name = temp.dataValues.name;
            // console.log(city_name);

        }
    });

}

export async function getCurrCity(trainId) {
    let x = moment().format();
    x = x.split('T');
    let time = x[0] + " " + x[1];
    let answer = await models.trainStatuses.findOne({ where: { dTime: { [Op.gte]: time }, trainId: trainId } });
    if (!answer) {
        return 0;
    }
    let curr_city = answer.dataValues.sCity;
    return curr_city;
}


export async function addDummyPackage(req, res) {
    const package11 = await models.packages.create(req.body);
    res.send(package11);
}

