'use strict';
import db from '../../models/index.js';
const Status = db.statuses;
export function addStatus(req, res) {
  try {
    Status.create({
      type: req.body.type
    }).then(() => {
      console.log('Order created');
      res.redirect('status');
    });
  } catch (error) {

  }

}