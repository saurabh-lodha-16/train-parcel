import db from '../../models';
let city = db['cities'];
let status = db['statuses'];
let user = db['users'];
let packages = db['packages'];

async function getPackages(userId) {
  try {
    let packageArray = await packages.findAll({
      where: { senderUserId: userId }
    });
    return packageArray;
  } catch (err) {
    throw (err);
  }
}

export async function listPackages(req, res) {
  try {
    if (req.session.user) {
      let packageArray = await getPackages(req.session.user.id);
      res.render('base', {
        content: 'package/packages.ejs',
        packageList: packageArray
      });
    } else {
      res.redirect('/login');
    }
  } catch (err) {
    res.render('base', {
      content: 'package/packages.ejs',
      packageList: packageArray,
      alert: "danger",
      alertMsg: err
    });
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
    let updatedUser = await user.update(
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
  let cityArray, packageId;
  try {
    if (req.session.user) {
      packageId = req.query.packageId;
      let packageInstance = await packages.findOne({ where: { id: packageId } });
      let sId = packageInstance.sCity;
      let dId = packageInstance.dCity;
      let sCityInstance = await city.findOne({ where: { id: sId } });
      let dCityInstance = await city.findOne({ where: { id: dId } });
      let rcvrUserId = packageInstance.rcvrUserId;
      let receiver = await user.findOne({ where: { id: rcvrUserId } });
      cityArray = await retrieveCityNames();
      res.render('base', {
        content: 'package/updatePackage.ejs',
        citiesArray: cityArray,
        weightPackage: packageInstance.weight,
        name: receiver.name,
        email: receiver.email,
        phoneNo: receiver.mobileNo,
        sCity : sCityInstance.name,
        dCity : dCityInstance.name,
        packageId: packageId
      });
    } else {
      res.redirect('/login');
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
      packageId: packageId,
      sCity: '',
      dCity: ''
    });
  }
}

export async function update(req, res) {
  let cityArray, packageId;
  try {
    if (req.session.user) {
      cityArray = await retrieveCityNames();
      packageId = req.body.packageId;
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
        let sCityInstance = await city.findOne({ where: { id: sourceCity } });
        let dCityInstance = await city.findOne({ where: { id: destinationCity } });
        res.render('base', {
          content: 'package/updatePackage.ejs',
          alertMsg: "Package successfully updated.",
          alert: "success",
          citiesArray: cityArray,
          weightPackage: weight,
          name: name,
          email: email,
          phoneNo: phoneNo,
          packageId: packageId,
          sCity : sCityInstance.name,
          dCity : dCityInstance.name
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
          sCity : '',
          dCity : ''
        });
      }
    } else {
      res.redirect('/login');
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
      packageId: packageId,
      sCity: '',
      dCity: ''
    });
  }
};

