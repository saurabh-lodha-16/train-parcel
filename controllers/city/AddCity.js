'use strict';
import db from '../../models/index.js';
const City = db.cities;
export function addCity(req, res) {
  City.create({
    name: req.body.name
  }).then(() => {
    console.log('Order created');
    res.redirect('city');
  });
}