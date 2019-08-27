'use strict';
import db from '../../models/index.js';
const Train = db.trains;
export function addTrain(req, res) {
  Train.findOne({
    attributes: ['id', 'name', 'trainNo'],
    where: {
      trainNo: req.body.trainNo
    }
  }).then((train) => {
    if (train == null) {
      Train.create({
        name: req.body.name,
        trainNo: req.body.trainNo
      }).then(() => {
        console.log('Train Added');
        res.redirect('train');
      });
    } else {
      res.render('train/add', {alert: 'danger', alertMsg: 'Train exist'})
    }
  })

}