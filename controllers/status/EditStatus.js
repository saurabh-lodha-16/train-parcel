'use strict';
import db from '../../models/index.js';
const Status = db.statuses;
export function editStatus(req, res) {
  try {
    Status.findOne({
      attributes: ['id', 'type'],
      where: { id: req.query._id }
    }).then((status) => {
      res.render('status/edit', status.dataValues);
    })
  } catch (error) {

  }
}