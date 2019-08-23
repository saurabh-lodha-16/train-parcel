import db from '../../models/index.js';
import models from '../../models';
const City = db.cities;
const Train = db.trains;
var request = require('request');
var moment = require('moment'); 
const Op = db.Sequelize.Op;
var cron = require('node-cron');

export async function fillStations(req, res) {
    request.get("http://indianrailapi.com/api/v2/livetrainstatus/apikey/c0298692ea871da8221f1df1cb24e2cc/trainnumber/12136/date/20190821/",
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
                    let sourceDayNumber = source.Day;
                    let destDayNumber = destination.Day;
                    let sourceDay, destDay;
                    if(sourceDayNumber == destDayNumber){
                        //same day dono jagah;
                        sourceDay = date1;
                        destDay = date1;
                    }
                    else{
                        sourceDay = date1;
                        date1 = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + ( date.getDate() + 1);
                        destDay = date1;
                    }
                    console.log(sourceDayNumber+ " " + destDayNumber);

                    let temp3 = await Train.findOne({where: {trainNo:12136}})
                    var trainId = temp3.dataValues.id;
                    let sTime = sourceDay + " "+ source.ActualDeparture + "+05:30";
                    let dTime = destDay+ " "+ destination.ActualArrival + "+05:30";
                    let answer = {trainId:trainId, date:date1, sCity:sCity, dCity:dCity, sTime:sTime, dTime:dTime};
                    await models.trainStatuses.create(answer);
                }
                res.send('Success');

            }
        });
}

// export async function addSomeShit(req, res){
//     const x = await models.trainStatuses.create(req.body);
//     res.send(x);
// }

export async function addSomeShit(req, res){
    //can be made generic
    const trainId = 'da7a4d12-a438-4c83-bddf-40aef69a22a4';
//get starting city;
    var start = await models.trainStatuses.findOne({where:{trainId:trainId}});
   var sourceCityId = start.dataValues.sCity;
   var curr_city = sourceCityId;
   cron.schedule('*/1 * * * *', async () => {
    var now_city = await getCurrCity(trainId);
    if(curr_city != now_city){
        curr_city = now_city;
        //city changed
     //update package status
     let temp1 = models.statuses.findOne({where:{type:'PENDING'}});
     let pendingId = temp1.dataValues.id;
     let temp2 = models.statuses.findOne({where:{type:'COMPLETED'}});
     let completedId = temp2.dataValues.id;

     var affectedRows = await models.packages.update({statusId:completedId}, {where:{dCity:curr_city, statusId:pendingId}})
     //in sabko notify karna hai dono ends pe receiver and user uska code aayega.
     //and ye hojaayega
    }
   

    console.log(city_name);
  });

}


export async function getCurrCity(trainId){
    var x = moment().format();
    x = x.split('T');
    var time = x[0]+" "+x[1];
     var answer = await models.trainStatuses.findOne({where:{dTime: {[Op.gte]:time}}, trainId:trainId})
     var curr_city = answer.dataValues.sCity;
    return curr_city;
 }


 