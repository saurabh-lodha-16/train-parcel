'use strict';
import db from '../../models/index.js';
const City = db.cities;
export function addCity(req, res) {
  try {
    City.create({
      name: req.body.name
    }).then(() => {
      res.redirect('city');
    });
  } catch (err) {
    console.log(`City was not Created 
    ${err}`);
  }

}

