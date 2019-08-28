'use strict';
import db from '../../models/index.js';
const Office = db.offices;
export function updateOffice(req, res) {
  try {
    Office.update({
      userId: req.body.user,
      cityId: req.body.city
    }, {
        where: { id: req.body.id }
      })
    res.redirect('/office');
  } catch (error) {
    
  }
}