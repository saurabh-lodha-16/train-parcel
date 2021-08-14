'use strict'
import db from '../../models/index.js'
const Train = db.trains
export function editTrain(req, res) {
  try {
    Train.findOne({
      attributes: ['id', 'name', 'trainNo'],
      where: { id: req.query._id }
    }).then((train) => {
      res.render('train/edit', train.dataValues)
    })
  } catch (error) {
    res.send(error)
  }
}

