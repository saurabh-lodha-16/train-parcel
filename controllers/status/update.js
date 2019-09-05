'use strict';
import db from '../../models/index.js';
const Status = db.statuses;
export function updateStatus(req, res) {
  try {
    Status.update({
      type: req.body.type
    }, {
        where: { id: req.params.id }
      })
    res.redirect('/statuses');
  } catch (error) {

  }
}

