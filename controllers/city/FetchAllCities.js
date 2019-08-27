'use strict';
import db from '../../models/index.js';
const City = db.cities;
export function fetchAllCities(req, res) {
  City.findAll({
    attributes: ['id', 'name']
  }).then((city) => {
    res.send(city);
  })
}