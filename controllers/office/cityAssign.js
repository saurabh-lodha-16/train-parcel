'use strict';
import db from '../../models/index.js';
const Office = db.offices;
export function cityAssign(req, res) {
  try {
    Office.findOne({
      attributes: ['id', 'userId', 'cityId'],
      where: {
        userId: req.body.user
      }
    }).then((train) => {
      if (train == null) {
        Office.create({
          userId: req.body.user,
          cityId: req.body.city
        }).then(() => {
          console.log('Order created');
          res.redirect('/office');
        });
      } else {
        Office.update({
          cityId: req.body.city
        },{where :{userId: req.body.user} }).then(() => {
          console.log('Order created');
          res.redirect('/office');
        });
      }
    })
  } catch (err) {
    res.render('office/cityAssign', { alert: 'danger', alertMsg: err});
  }
}