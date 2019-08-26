
import db from '../../models/index.js';
const City = db.cities;
const Train = db.trains;
var request = require('request');

export function getStations(req, res) {
    request.get("http://indianrailapi.com/api/v2/livetrainstatus/apikey/c0298692ea871da8221f1df1cb24e2cc/trainnumber/12136/date/20190826/",
        (error, response, body) => {
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
                    City.create({
                        name: cities[i]
                    }).then(() => {
                        console.log('City Added');
                        res.send('Done');
                    });
                }
            }
        });
}


