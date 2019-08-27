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
          res.redirect('office');
        });
      } else {
        res.render('office/cityAssign', { alert: 'danger', alertMsg: 'User Already Assigned' })
      }
    })
  } catch (err) {
    res.render('office/cityAssign', { alert: 'danger', alertMsg: err});
  }
}