'use strict';
import db from '../../models/index.js';
import { redirectWithMsg } from '../common.js';
const Train = db.trains;
export function updateTrain(req, res) {
  try {
    Train.update({
      name: req.body.name,
      trainNo: req.body.trainNo
    }, {
        where: { id: req.body.id }
      })
    redirectWithMsg('/trains', req, res, "success", "Successfully Updated")
  } catch (error) {
    res.redirect('/trains', { alert: 'danger', alertMsg: error })
  }
}

