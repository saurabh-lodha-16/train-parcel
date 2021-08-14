'use strict'
import db from '../../models/index.js'
const City = db.cities
export function fetchAllCities(req, res) {
  try {
    City.findAll({
      attributes: ['id', 'name']
    }).then((city) => {
      res.send(city)
    })
  } catch (err) {
    console.log(err)
    res.status(404)
    res.send('Not Found')
  }
}

