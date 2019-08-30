import db from '../../models';
import { getRole } from '../common';
let city = db['cities'];
let status = db['statuses'];
let userDB = db['users'];
let packages = db['packages'];

async function getPackages(userId) {
  try {
    let packageArray = await packages.findAll({
    });
    return packageArray;
  } catch (err) {
    throw (err);
  }
}

export async function listPackages(req, res) {
  let user = req.session.user

  if (user) {
    try {
      let packageArray = await getPackages(req.session.user.id);
      res.render('base', {
        content: 'package/packages.ejs',
        packageList: packageArray,
        userRole: await getRole(user.id)
      });

    } catch (err) {
      res.render('base', {
        content: 'package/packages.ejs',
        packageList: packageArray,
        alert: "danger",
        alertMsg: err,
        userRole: await getRole(user.id)
      });

    }
  } else {
    res.redirect('/login');
  }
}

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

async function getStatus(id) {
  try {
    let statusInstance = await status.findOne({
      where: { id: id }
    });
    return statusInstance;
  } catch (err) {
    throw (err);
  }
}

async function getPackage(id) {
  try {
    let packageInstance = await packages.findOne({
      where: { id: id }
    });
    return packageInstance;
  } catch (err) {
    throw (err);
  }
}

async function updateUser(userId, name, email, phoneNo) {
  try {
    let updatedUser = await userDB.update(
      {
        name: name,
        email: email,
        mobileNo: phoneNo
      },
      { where: { id: userId } }
    );
  } catch (err) {
    throw (err);
  }
}

async function updatePackage(packageId, weightPackage, sourceId, destinationId) {
  try {
    let packageInstance = await packages.update({
      weight: weightPackage,
      sCity: sourceId,
      dCity: destinationId
    }, { where: { id: packageId } });
    return packageInstance;
  } catch (err) {
    throw (err);
  }
}

export async function renderUpdation(req, res) {
  let cityArray;
  let user = req.session.user
  if (user) {
    try {
      let packageId = req.query.package;
      let packageInstance = await packages.findOne({ where: { id: packageId } });
      let rcvrUserId = packageInstance.rcvrUserId;
      let receiver = await userDB.findOne({ where: { id: rcvrUserId } });
      cityArray = await retrieveCityNames();
      res.render('base', {
        content: 'package/updatePackage.ejs',
        citiesArray: cityArray,
        weightPackage: packageInstance.weight,
        name: receiver.name,
        email: receiver.email,
        phoneNo: receiver.mobileNo,
        packageId: packageId,
        userRole: await getRole(user.id)
      });

    } catch (err) {
      res.render('base', {
        content: 'package/updatePackage.ejs',
        alertMsg: err,
        alert: "danger",
        citiesArray: cityArray,
        weightPackage: '',
        name: '',
        email: '',
        phoneNo: '',
        packageId: 1,
        userRole: await getRole(user.id)
      });
    }
  } else {
    res.redirect('/login');
  }
};

export async function update(req, res) {
  let cityArray;
  let user = req.session.user
  if (user) {

    try {
      cityArray = await retrieveCityNames();
      let packageId = req.body.packageId;
      let packageInstance = await getPackage(packageId);
      let statusId = packageInstance.statusId;
      let statusInstance = await getStatus(statusId);
      if (statusInstance.type === 'PENDING') {
        let weight = req.body.weight;
        let sourceCity = req.body.source_city_id;
        let destinationCity = req.body.destination_city_id;
        let receiverId = packageInstance.rcvrUserId;
        let name = req.body.name;
        let email = req.body.email;
        let phoneNo = req.body.phoneNo;
        await updatePackage(packageId, weight, sourceCity, destinationCity);
        await updateUser(receiverId, name, email, phoneNo);
        res.render('base', {
          content: 'package/updatePackage.ejs',
          alertMsg: "Package successfully updated.",
          alert: "success",
          citiesArray: cityArray,
          weightPackage: '',
          name: '',
          email: '',
          phoneNo: '',
          packageId: packageId,
          userRole: await getRole(user.id)
        });
      } else {
        res.render('base', {
          content: 'package/updatePackage.ejs',
          alertMsg: "Your package is already processed.",
          alert: "info",
          citiesArray: cityArray,
          weightPackage: '',
          name: '',
          email: '',
          phoneNo: '',
          packageId: packageId,
          userRole: await getRole(user.id)
        });
      }

    } catch (err) {
      res.render('base', {
        content: 'package/updatePackage.ejs',
        alertMsg: err,
        alert: "danger",
        citiesArray: cityArray,
        weightPackage: '',
        name: '',
        email: '',
        phoneNo: '',
        packageId: 1,
        userRole: await getRole(user.id)
      });
    }
  } else {
    res.redirect('/login');
  }
};
