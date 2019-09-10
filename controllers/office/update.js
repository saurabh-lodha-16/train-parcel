'use strict'
import db from '../../models/index.js'
import { redirectWithMsg } from '../services/common.js'
const Office = db.offices
export function updateOffice(req, res) {
  try {
    Office.update({
      cityId: req.body.city
    }, {
        where: { id: req.params.id }
      })
    redirectWithMsg('/offices', req, res, 'success', 'Updated Office Successfully')

  } catch (error) {
    console.log(error)
  }
}

