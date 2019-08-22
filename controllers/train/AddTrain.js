'use strict';
import db from '../../models/index.js';
const Train = db.trains;
export function addTrain(req, res) {
  Train.create({
    name: req.body.name
  }).then(() => {
    console.log('Order created');
    res.redirect('train');
  });
}