import db from '../../models';
import { getRole } from '../common';
let city = db['cities'];
let status = db['statuses'];
let userDB = db['users'];
let packages = db['packages'];

export async function getPackages(userId, userRole) {
  try {
    let packageArray
    if (userRole == 'Manager') {
      let curr_office = await db.offices.findOne({
        where: {
          userId: userId
        }
      })
      if (curr_office) {
        packageArray = await packages.findAll({
          where: {
            [db.Sequelize.Op.or]: [
              {
                sCity: curr_office.cityId
              }
            ]
          }
        });
      } else {
        return []
      }
    } else {
      packageArray = await packages.findAll({
        where: { senderUserId: userId }
      });
    }

    return packageArray;
  } catch (err) {
    throw (err);
  }
}

export async function listPackages(req, res) {
  let user = req.session.user;
  if (user) {
    let packageArray = []
    try {
      let userRole = await getRole(user.id)
      packageArray = await getPackages(req.session.user.id, userRole);
      res.render('base', {
        content: 'package/packages.ejs',
        packageList: packageArray,
        userRole: userRole
      });

    } catch (err) {
      res.status(500);
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
      let packageId = req.query.packageId;
      if (!packageId) {
        res.redirect('../packages');
      }
      let packageInstance = await packages.findOne({ where: { id: packageId } });
      let sId = packageInstance.sCity;
      let dId = packageInstance.dCity;
      let sCityInstance = await city.findOne({ where: { id: sId } });
      let dCityInstance = await city.findOne({ where: { id: dId } });
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
        sCity: sCityInstance.name,
        dCity: dCityInstance.name,
        userRole: await getRole(user.id)
      });

    } catch (err) {
      res.status(500);
      res.render('base', {
        content: 'package/updatePackage.ejs',
        alertMsg: err,
        alert: "danger",
        citiesArray: cityArray,
        weightPackage: '',
        name: '',
        email: '',
        phoneNo: '',
        sCity: '',
        dCity: '',
        packageId: 1,
        userRole: await getRole(user.id)
      });
    }
  } else {
    res.redirect('/login');
  }
}

export async function update(req, res) {
  let cityArray, packageId;
  let user = req.session.user
  if (user) {
    let userRole = await getRole(req.session.user.id);
    let packageArray = await getPackages(req.session.user.id, userRole);
    try {
      cityArray = await retrieveCityNames();
      packageId = req.params.id;
      let packageInstance = await getPackage(packageId);
      let statusId = packageInstance.statusId;
      let statusInstance = await getStatus(statusId);
      if (statusInstance.type === 'PENDING') {
        if (req.body.source_city_id === req.body.destination_city_id) {
          throw "Source and destination city should be different.";
        }
        if (req.body.phoneNo.length !== 10) {
          throw "Phone number must consist 10 digits.";
        }
        let isEmpty1 = (req.body.name && req.body.email && req.body.phoneNo);
        let isEmpty2 = (req.body.source_city_id && req.body.destination_city_id && req.body.weight);
        if (!(isEmpty1 && isEmpty2)) {
          throw "Fill the required fields.";
        }
        let weight = req.body.weight;
        let sourceCity = req.body.source_city_id;
        let destinationCity = req.body.destination_city_id;
        let receiverId = packageInstance.rcvrUserId;
        let name = req.body.name;
        let email = req.body.email;
        let phoneNo = req.body.phoneNo;
        await updatePackage(packageId, weight, sourceCity, destinationCity);
        await updateUser(receiverId, name, email, phoneNo);
        let sCityInstance = await city.findOne({ where: { id: sourceCity } });
        let dCityInstance = await city.findOne({ where: { id: destinationCity } });
        userRole = await getRole(req.session.user.id);
        packageArray = await getPackages(req.session.user.id, userRole);
        res.render('base', {
          content: 'package/packages.ejs',
          packageList: packageArray,
          userRole: userRole,
          alertMsg: "Package successfully updated.",
          alert: "success"
        });
      } else {
        res.render('base', {
          content: 'package/packages.ejs',
          packageList: packageArray,
          userRole: userRole,
          alertMsg: "Package already processed.",
          alert: "info"
        });
      }

    } catch (err) {
      res.status(500);
      res.render('base', {
        content: 'package/packages.ejs',
        packageList: packageArray,
        userRole: userRole,
        alertMsg: err,
        alert: "danger"
      });
    }
  } else {
    res.redirect('/login');
  }
};

