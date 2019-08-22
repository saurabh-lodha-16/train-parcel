'use strict';
import db from '../../models/index.js';
const Train = db.trains;
export function editTrain(req, res) {
  Train.findOne({
    attributes: ['id', 'name'],
    where: {id: req.query._id} 
  }).then((train ) => {
    res.render('train/edit',train.dataValues);
  })
}