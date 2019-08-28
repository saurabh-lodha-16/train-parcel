'use strict';
import db from '../../models/index.js';
import { getCityName, getUserName } from '../getCityName'
const Office = db.offices;
export async function fetchAllOffices(req, res) {
  try {
    let offices = await Office.findAll({
      attributes: ['id', 'cityId', 'userId'],
      include: [{
        model: db.users,
      }, {
        model: db.cities,
      }]
    })
    res.send(offices);
  } catch (error) {
    res.send(error);
  }
}