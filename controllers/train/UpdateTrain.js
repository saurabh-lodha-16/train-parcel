'use strict';
import db from '../../models/index.js';
const Train = db.trains;
export function updateTrain(req, res) {
  Train.update({
    name: req.body.name
  },{ 
    where: {id: req.body.id} 
  })
  res.redirect('train');
}