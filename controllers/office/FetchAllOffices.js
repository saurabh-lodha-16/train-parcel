'use strict';
import db from '../../models/index.js';
const Office = db.offices;
export function fetchAllOffices(req, res) {
  Office.findAll({
    attributes: ['id', 'cityId', 'userId']
  }).then((city) => {
    res.send(city);
  })
}