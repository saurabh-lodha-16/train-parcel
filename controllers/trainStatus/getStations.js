
import db from '../../models/index.js';
const City = db.cities;
const Train = db.trains;
var request = require('request');

export async function getStations(req, res) {
    request.get("http://indianrailapi.com/api/v2/livetrainstatus/apikey/c0298692ea871da8221f1df1cb24e2cc/trainnumber/17031/date/20190827/",
        async (error, response, body) => {
            if (error) {
                return console.dir(error);
            }
            else {
                var obj = JSON.parse(body);
                var store = obj.TrainRoute;
                var cities = [];
                for (let i = 0; i < store.length; i++) {
                    cities.push(store[i].StationName);
                }
                for (let i = 0; i < cities.length; i++) {
                    const cityExists = await City.findOne({ where: { name: cities[i] } });
                    if (!cityExists) {
                        const x = await City.create({ name: cities[i] })
                    }
                }
            }
        });
}

