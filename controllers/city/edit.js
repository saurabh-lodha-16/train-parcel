'use strict';
import db from '../../models/index.js';
const City = db.cities;
export function editCity(req, res) {
  try {
    // console.log(req.params._id)
    City.findOne({
      attributes: ['id', 'name'],
      where: { id: req.query._id }
    }).then((city) => {
      res.render('city/edit', city.dataValues);
    })
  } catch (err) {
    // console.log(err);
    res.status(402)
  }
}

