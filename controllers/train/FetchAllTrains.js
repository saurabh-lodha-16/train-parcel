'use strict';
import db from '../../models/index.js';
const Train = db.trains;
export function fetchAllTrains(req, res) {
  Train.findAll({
    attributes: ['id', 'name']
  }).then((train ) => {
    res.send(train);
  })
}