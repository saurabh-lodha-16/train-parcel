'use strict'
import db from '../../models/index.js'
import { redirectWithMsg } from '../services/common.js'
const Status = db.statuses
export function addStatus(req, res) {
  try {
    Status.create({
      type: req.body.type
    }).then(() => {
      redirectWithMsg('/statuses', req, res, "success", "Successfully Updated")
    })
  } catch (error) {
    redirectWithMsg('/statuses', req, res, "danger", error)
  }
}

