'use strict';
import db from '../../models/index.js';
const Train = db.trains;
export function addTrain(req, res) {
  try {
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
          res.redirect('train');
        });
      } else {
        res.render('train/add', { alert: 'danger', alertMsg: 'Train exist' })
      }
    })
  } catch (error) {
    res.render('train/add', { alert: 'danger', alertMsg: error })
  }
}

