'use strict';
import db from '../../models/index.js';
const Office = db.offices;
export function fetchAllOffices(req, res) {
  try {
    Office.findAll({
      attributes: ['id', 'cityId', 'userId']
    }).then((city) => {
      res.send(city);
    })
  } catch (error) {
    res.send(error);
  }
}