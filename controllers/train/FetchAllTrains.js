'use strict';
import db from '../../models/index.js';
const Train = db.trains;
export function fetchAllTrains(req, res) {
  try {
    Train.findAll({
      attributes: ['id', 'name', 'trainNo']
    }).then((train) => {
      res.send(train);
    })
  } catch (error) {
    res.send(error);
  }
}
