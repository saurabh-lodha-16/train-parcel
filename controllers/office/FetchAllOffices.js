'use strict';
import db from '../../models/index.js';
import { getCityName, getUserName } from '../getCityName'
const Office = db.offices;
export async function fetchAllOffices(req, res) {
  try {
    let offices = await Office.findAll({
      attributes: ['id', 'cityId', 'userId']
    })
    if (offices == null) {
      throw 'No Office found';
    }
    let officeList = [];
    for (let office of offices) {

      office.dataValues.cityName = await getCityName(office.cityId);
      office.dataValues.userName = await getUserName(office.userId);
      officeList.push(office);
    }
    res.send(officeList);
  } catch (error) {
    res.send(error);
  }
}