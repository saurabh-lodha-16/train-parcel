import models from '../../models';
var moment = require('moment');
const Op = db.Sequelize.Op;

export async function getPackageStatus(req, res) {
    const serial_no = req.body.serial_no;
    let temp1 = models.statuses.findOne({ where: { type: 'PENDING' } });
    let pendingId = temp1.dataValues.id;
    let temp2 = models.statuses.findOne({ where: { type: 'COMPLETED' } });
    let completedId = temp2.dataValues.id;
    var packageDetails = await models.packages.findOne({where:{serial_no:serial_no}});
    var statusId = packageDetails.dataValues.statusId;
    var trainId = packageDetails.dataValues.trainId;
    if(statusId == completedId){
        console.log('Your package has reached')
    }
    else{
        //show trail
        var x = moment().format();
        x = x.split('T');
        var time = x[0]+" "+x[1];
         var answer = await models.trainStatuses.findAll({where:{dTime: {[Op.lte]:time}}, trainId:trainId})
         //get cities;
         //phir unko front end mai sahi se dikhani hai and the last one is the current city and that
         //should be highlighted sort of with all the time values estimated etc.
         //isse hojaayega


    }


}