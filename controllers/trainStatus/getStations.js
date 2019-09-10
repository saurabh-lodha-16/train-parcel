import db from '../../models/index.js'
const City = db.cities
let request = require('request')

export async function getStations(req, res) {
  request.get("http://indianrailapi.com/api/v2/livetrainstatus/apikey/c0298692ea871da8221f1df1cb24e2cc/trainnumber/12136/date/20190828/",
    async (error, response, body) => {
      if (error) {
        return console.dir(error)
      } 
      else {
        let obj = JSON.parse(body)
        let store = obj.TrainRoute
        let cities = []
        for (let i = 0; i < store.length; i++) {
          cities.push(store[i].StationName)
        }
        for (let i = 0; i < cities.length; i++) {
          const cityExists = await City.findOne({
            where: {
              name: cities[i]
            }
          })
          if (!cityExists) {
            const x = await City.create({
              name: cities[i]
            })
          }
        }
      }
    })
}
