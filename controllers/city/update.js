'use strict';
import db from '../../models/index.js';
import { redirectWithMsg } from '../common.js';
const City = db.cities;
export function updateCity(req, res) {
  try {
    City.update({
      name: req.body.name
    }, {
        where: { id: req.params.id }
      })
    redirectWithMsg('/cities', req, res, 'success', 'Successfully updated!')
  } catch (err) {
    console.log(err);
    res.status(402)
  }
}

