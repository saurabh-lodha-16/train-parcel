'use strict';
import db from '../../models/index.js';
const Office = db.offices;
export function editOffice(req, res) {
  try {
    Office.findOne({
      attributes: ['id', 'userId', 'cityId'],
      where: { id: req.query._id }
    }).then((city) => {
      res.render('office/edit', city.dataValues);
    })
  } catch (err) {
    res.render('office', { alert: 'danger', alertMsg: err});
  }
}