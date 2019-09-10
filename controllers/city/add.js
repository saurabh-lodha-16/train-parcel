'use strict';
import db from '../../models/index.js';
import { redirectWithMsg } from '../common.js';
const City = db.cities;
export function addCity(req, res) {
  try {
    City.create({
      name: req.body.name
    }).then(() => {
      redirectWithMsg('/cities', req, res, "success", "Succesfully Added")
    });
  } catch (err) {
    res.status(404)
    redirectWithMsg('/cities', req, res, "danger", err)
  }
}



