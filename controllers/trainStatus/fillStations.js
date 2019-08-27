import db from '../../models/index.js';
import models from '../../models';
const City = db.cities;
const Train = db.trains;
var request = require('request');
var moment = require('moment');
const Op = db.Sequelize.Op;
var cron = require('node-cron');
const uuidv4 = require('uuid/v4');

export async function fillStations(req, res) {
    request.get("http://indianrailapi.com/api/v2/livetrainstatus/apikey/c0298692ea871da8221f1df1cb24e2cc/trainnumber/12136/date/20190827/",
        async (error, response, body) => {
            if (error) {
                return console.dir(error);
            }
            else {
                var obj = JSON.parse(body);
                var stations = obj.TrainRoute;
                //  let startDate = stations[0].Day;

                var date = new Date();
                var date1 = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
                var inc = 0;
                for (let i = 0; i < stations.length; i++) {
                    if (i == stations.length - 1) {
                        let source = stations[i];
                        let destination = stations[i];
                        let sourceCity = source.StationName;
                        let temp1 = await City.findOne({ where: { name: sourceCity } });
                        var sCity = temp1.dataValues.id;
                        let destcity = destination.StationName;
                        let temp2 = await City.findOne({
                            where: { name: destcity }
                        })
                        var dCity = temp2.dataValues.id;
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
                        let temp3 = await Train.findOne({ where: { trainNo: 12136 } })
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
                        let temp1 = await City.findOne({ where: { name: sourceCity } });
                        var sCity = temp1.dataValues.id;
                        let destcity = destination.StationName;
                        let temp2 = await City.findOne({
                            where: { name: destcity }
                        })
                        var dCity = temp2.dataValues.id;
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
                        console.log(sourceDayNumber + " " + destDayNumber);

                        let temp3 = await Train.findOne({ where: { trainNo: 12136 } })
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


export async function addSomeShit() {

    //can be made generic
    const trainDetails = await models.trainStatuses.findAll({ where: { isRunning: 'true' } });
    const someShit = [];
    for (let i = 0; i < trainDetails.length; i++) {
        someShit.push(trainDetails[i].dataValues.trainId);
    }
    const trainIds = [...new Set(someShit)]

    for (let i = 0; i < trainIds.length; i++) {
        const trainId = trainIds[i];
        const start = await models.trainStatuses.findOne({ where: { trainId: trainId } });
        const sourceCityId = start.dataValues.sCity;
        const curr_city = sourceCityId;


        cron.schedule('*/10 * * * *', async () => {
            var now_city = await getCurrCity(trainId);
            if (curr_city != now_city) {
                curr_city = now_city;
                let temp1 = await models.statuses.findOne({ where: { type: 'IN-TRANSIT' } });
                let inTransitId = temp1.dataValues.id;
                let temp2 = await models.statuses.findOne({ where: { type: 'COMPLETED' } });
                let completedId = temp2.dataValues.id;

                const [,] = await models.packages.update({ statusId: completedId },
                    {
                        where: { trainId: trainId, dCity: curr_city, statusId: inTransitId, isActive: true },
                        returning: true,
                        plain: true
                    })
                //change  train running status after it has completed like full journey..uska code aayega ek
            }
            let temp = await models.cities.findOne({ where: { id: curr_city } });
            let city_name = temp.dataValues.name;
            console.log(city_name);
        });
    }

}

export async function getCurrCity(trainId) {
    var x = moment().format();
    x = x.split('T');
    var time = x[0] + " " + x[1];
    var answer = await models.trainStatuses.findOne({ where: { dTime: { [Op.gte]: time }, trainId: trainId } });
    var curr_city = answer.dataValues.sCity;
    return curr_city;
}


export async function addDummyPackage(req, res) {
    const package11 = await models.packages.create(req.body);
    res.send(package11);
}