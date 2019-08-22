'use strict';
import db from '../../models/index.js';
const City = db.cities;
export function editCity(req, res) {
  City.findOne({
    attributes: ['id', 'name'],
    where: {id: req.query._id} 
  }).then((city ) => {
    res.render('city/edit',city.dataValues);
  })
}