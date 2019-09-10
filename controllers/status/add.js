'use strict';
import db from '../../models/index.js';
import { redirectWithMsg } from '../common.js';
const Status = db.statuses;
export function addStatus(req, res) {
  try {
    Status.create({
      type: req.body.type
    }).then(() => {
      console.log('Order created');
      redirectWithMsg('/statuses', req, res, "success", "Successfully Updated")
    });
  } catch (error) {
    redirectWithMsg('/statuses', req, res, "danger", error)
  }
}

