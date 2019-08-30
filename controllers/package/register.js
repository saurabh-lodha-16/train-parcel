import db from '../../models';
let roles = db['roles'];
let city = db['cities'];
let status = db['statuses'];
let user = db['users'];
let packages = db['packages'];
let roleAssigns = db['roleAssigns'];
import { getRole } from '../common'

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
      fetchedUser = await user.findOne({
        where: { email: email }
      });
    }
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
  let cityArray;
  try {
    let loggedUser = req.session.user
    if (loggedUser) {
      cityArray = await retrieveCityNames();
      res.render('base', {
        content: 'package/registerPackage',
        citiesArray: cityArray,
        userRole: await getRole(loggedUser.id)
      });
    }else{
      res.redirect('/login')
    }

  } catch (err) {
    res.render('base', {
      content: 'package/registerPackage',
      citiesArray: cityArray,
      alert: 'danger'
    });
  }
};

export async function registerPackage(req, res) {
  let loggedUser = req.session.user;
  if (loggedUser && req.cookies.user_sid) {
    let cityArray = await retrieveCityNames();
    try {
      let senderId = req.session.user.id;
      let statusInstance = await getStatus('PENDING');
      let statusId = statusInstance.id;
      let createdUser = await createUser(req.body.name, req.body.email, req.body.phoneNo);
      let receiverId = createdUser.id;
      let sourceId = req.body.source_city_id;
      let destinationId = req.body.destination_city_id;
      let createdPackage = await createPackage(senderId, receiverId, statusId, req.body.weight, sourceId, destinationId);
      console.log(createdPackage);
      res.render('base', {
        content: 'package/registerPackage',
        alertMsg: `Package successfully registered. \n Package Serial ID : ${createdPackage.serial_no}`,
        alert: "success",
        citiesArray: cityArray,
        userRole: await getRole(loggedUser.id)
      });
    } catch (err) {
      res.render('base', {
        content: 'package/registerPackage',
        citiesArray: cityArray,
        alert: 'danger',
        alertMsg: 'Error: ' + err,
        userRole: await getRole(loggedUser.id)
      });
    }
  } else {
    res.render('auth/login', { alert: 'danger', alertMsg: 'Please Login first!' });
  }
};

