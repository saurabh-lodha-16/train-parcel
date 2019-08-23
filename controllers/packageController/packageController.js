import db from '../../models';
let city = db['cities'];
let status = db['statuses'];
let user = db['users'];
let packages = db['packages'];

async function retrieveCityNames() {
  let cities = await city.findAll({
    attributes : ['name', 'id']
  });
  return cities;
}

async function getStatus(typeOfStatus) {
  let statusInstance = await status.findOne({
    where : {type : typeOfStatus}
  });
  return statusInstance;
}

async function createUser(name, email, phoneNo) {
  let createdUser = await user.create({
    name : name,
    email : email,
    mobileNo : phoneNo,
  });
  return createdUser;
}

async function createPackage(senderId, receiverId, statusId, weightPackage, sourceId, destinationId) {
  let packageInstance = await packages.create({
    senderUserId : senderId,
    rcvrUserId : receiverId,
    statusId : statusId,
    weight : weightPackage,
    sCity : sourceId,
    dCity : destinationId
  });
  return packageInstance;
}

exports.renderRegistration = async function(req, res) {
  let cityArray = await retrieveCityNames();
  res.render('package/registerPackage.ejs', {
    citiesArray : cityArray
  });
};

exports.registerPackage = async function(req, res) {
  let senderId = '7c74ad54-9e21-4137-8a90-d20918106281';
  let statusInstance = await getStatus('pending');
  let statusId = statusInstance.id;
  let createdUser = await createUser(req.body.name, req.body.email, req.body.phoneNo);
  let receiverId = createdUser.id;
  let sourceId = req.body.source_city_id;
  let destinationId = req.body.destination_city_id;
  let createdPackage = await createPackage(senderId, receiverId, statusId, req.body.weight, sourceId, destinationId);
  res.redirect('../package');
};
