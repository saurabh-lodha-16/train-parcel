import db from '../../models/index.js';
import models from '../../models';
const City = db.cities;
const Train = db.trains;
var request = require('request');

export async function fillStations(req, res) {
    request.get("http://indianrailapi.com/api/v2/livetrainstatus/apikey/c0298692ea871da8221f1df1cb24e2cc/trainnumber/12136/date/20190821/",
        async (error, response, body) => {
            if (error) {
                return console.dir(error);
            }
            else {
                var obj = JSON.parse(body);
                var stations = obj.TrainRoute;
                let startDate = stations[0].Day;

                var date = new Date();
                var date1 = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
                var inc = 0;
                for (let i = 0; i < stations.length - 1; i++) {
                    let source = stations[i];
                    let destination = stations[i + 1];
                    let sourceCity = source.StationName;
                    let temp1 = await City.findOne({where: { name: sourceCity }});
                    var sCity = temp1.dataValues.id;
                    let destcity = destination.StationName;
                    let temp2 = await City.findOne({
                        where: { name: destcity }
                    })
                    var dCity = temp2.dataValues.id;
                    if(source.Day != startDate){
                        //day should be updated
                        inc++;
                        date1 = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + ( date.getDate() + inc);
                        startDate = (parseInt(startDate)+inc).toString();
                    }
                    let temp3 = await Train.findOne({where: {trainNo:12136}})
                    var trainId = temp3.dataValues.id;
                    let sTime = source.ActualDeparture;
                    let dTime = destination.ActualArrival;

                    let answer = {trainId:trainId, date:date1, sCity:sCity, dCity:dCity, sTime:sTime, dTime:dTime};
                    await models.trainStatuses.create(answer);
                }
                res.send('Success');

            }
        });
}

export async function addSomeShit(req, res){
    const x = await models.trainStatuses.create(req.body);
    res.send(x);
}
