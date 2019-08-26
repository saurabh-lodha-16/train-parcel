import db from '../../models';
let city = db['cities'];
let status = db['statuses'];
let user = db['users'];
let packages = db['packages'];

async function retrieveCityNames() {
  try {
    let cities = await city.findAll({
      attributes: ['name', 'id']
    });
    return cities;
  } catch (err) {
    throw (err);
  }
}

async function getStatus(typeOfStatus) {
  try {
    let statusInstance = await status.findOne({
      where: { type: typeOfStatus }
    });
    return statusInstance;
  } catch (err) {
    throw (err);
  }
}

async function createUser(name, email, phoneNo) {
  try {
    let createdUser;
    let fetchedUser = await user.findOne({
      where: { mobileNo: phoneNo }
    });
    if (!fetchedUser) {
      createdUser = await user.create({
        name: name,
        email: email,
        mobileNo: phoneNo
      });
    } else {
      createdUser = fetchedUser;
    }
    return createdUser;
  } catch (err) {
    throw (err);
  }
}

async function createPackage(senderId, receiverId, statusId, weightPackage, sourceId, destinationId) {
  try {
    let packageInstance = await packages.create({
      senderUserId: senderId,
      rcvrUserId: receiverId,
      statusId: statusId,
      weight: weightPackage,
      sCity: sourceId,
      dCity: destinationId
    });
    return packageInstance;
  } catch (err) {
    throw (err);
  }
}

export async function renderRegistration(req, res) {
  try {
    let cityArray = await retrieveCityNames();
    res.render('package/registerPackage.ejs', {
      citiesArray: cityArray
    });
  } catch (err) {
    res.render('package/registerPackage.ejs', {
      alertMsg: err,
      alert: "danger",
      citiesArray: cityArray
    });
  }
};

export async function registerPackage(req, res) {
  let cityArray = await retrieveCityNames();
  try {
    let cityArray = await retrieveCityNames();
    let senderId = 'bafd904a-8425-4e0d-8e95-c6ea531d76c8';
    let statusInstance = await getStatus('PENDING');
    let statusId = statusInstance.id;
    let createdUser = await createUser(req.body.name, req.body.email, req.body.phoneNo);
    let receiverId = createdUser.id;
    let sourceId = req.body.source_city_id;
    let destinationId = req.body.destination_city_id;
    let createdPackage = await createPackage(senderId, receiverId, statusId, req.body.weight, sourceId, destinationId);
    res.redirect('../package');
  } catch (err) {
    res.render('package/registerPackage.ejs', {
      alertMsg: err,
      alert: "danger",
      citiesArray: cityArray
    });
  }
};
