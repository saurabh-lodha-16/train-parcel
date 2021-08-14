'use strict'
import db from '../../models/index.js'
import { getCityName, getUserName } from '../services/getCityName'
const Office = db.offices
export async function fetchAllOffices(req, res) {
  try {
    let offices = await Office.findAll({
      attributes: ['id', 'cityId', 'userId'],
      include: [{
        model: db.users,
      }, {
        model: db.cities,
      }]
    })
    res.status(200)
    res.send(offices)
  } catch (error) {
    res.status(404)
    res.send(error)
  }
}

