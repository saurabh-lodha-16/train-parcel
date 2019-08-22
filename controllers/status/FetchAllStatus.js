'use strict';
import db from '../../models/index.js';
const Status = db.statuses;
export function fetchAllStatus(req, res) {
  Status.findAll({
    attributes: ['id', 'type']
  }).then((status ) => {
    res.send(status);
  })
}