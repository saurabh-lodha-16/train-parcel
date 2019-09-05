'use strict';
import db from '../../models/index.js';
const Office = db.offices;
export function updateOffice(req, res) {
  try {
    Office.update({
      cityId: req.body.city
    }, {
        where: { id: req.params.id }
      })
    res.redirect('/offices');
  } catch (error) {
    console.log(error)
  }
}

