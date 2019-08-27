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
  let cityArray;
  try {
    cityArray = await retrieveCityNames();
    res.render('package/updatePackage.ejs', {
      citiesArray: cityArray
    });
  } catch (err) {
    res.render('package/updatePackage.ejs', {
      alertMsg: err,
      alert: "danger",
      citiesArray: cityArray
    });
  }
};

export async function update(req, res) {
  let cityArray;
  try {
    cityArray = await retrieveCityNames();
    let packageId = 'd9c38679-4a24-4472-bd39-5b873b582a3a';
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
      updatePackage(packageId, weight, sourceCity, destinationCity);
      updateUser(receiverId, name, email, phoneNo);
      res.render('package/updatePackage.ejs', {
        alertMsg: "Package successfully updated.",
        alert: "success",
        citiesArray: cityArray
      });
    } else {
      res.render('package/updatePackage.ejs', {
        alertMsg: "Your package is already processed.",
        alert: "info",
        citiesArray: cityArray
      });
    }
  } catch (err) {
    res.render('package/updatePackage.ejs', {
      alertMsg: err,
      alert: "danger",
      citiesArray: cityArray
    });
  }
};
