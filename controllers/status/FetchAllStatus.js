'use strict';
import db from '../../models/index.js';
const Status = db.statuses;
export function fetchAllStatus(req, res) {
  try {
    Status.findAll({
      attributes: ['id', 'type']
    }).then((status) => {
      res.send(status);
    })
  } catch (error) {

  }
}

