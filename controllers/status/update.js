'use strict'
import db from '../../models/index.js'
import { redirectWithMsg } from '../services/common.js'
const Status = db.statuses
export function updateStatus(req, res) {
  try {
    Status.update({
      type: req.body.type
    }, {
        where: { id: req.params.id }
      })
    redirectWithMsg('/statuses', req, res, "success", "Upadated Successfully")
  } catch (error) {
    redirectWithMsg('/statuses', req, res, "danger", error)
  }
}

