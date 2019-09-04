'use strict';
import db from '../../models/index.js';
const City = db.cities;
export function updateCity(req, res) {
  try {
    City.update({
      name: req.body.name
    }, {
        where: { id: req.body.id }
      })
    res.redirect('/cities');
  } catch (err) {
    console.log(err);
    res.status(402)
  }
}

