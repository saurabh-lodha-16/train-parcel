const express = require('express');
const router = express.Router();
let cities = [{
  	name: 'jaipur',
  	id: 1
  },{
  	name: 'nagpur',
  	id: 2
  }];
let counter = 3; 
router.get('/', function(req, res, next) {
  res.send(cities);
});

router.get('/add', function(req, res, next) {
  res.render('cityviews/add');
});

router.post('/add', function(req, res, next) {
  req.body.id= counter++;
  cities.push(req.body);

  res.render('cityviews/city');
});

router.get('/edit', function(req, res, next) {
	let result = {};
  for(let city of cities) {
    if(city.id == req.query._id) {
      result = city;
      break;
    }
  }
  res.render('cityviews/edit',result);
});
router.post('/edit', function(req, res, next) {
  let count = 0;

  for(let city of cities) {
    if(city.id == req.body.id) {
      break;
    }
    count++;
  }
  cities[count].name = req.body.name;
  console.log(cities);
  res.render('cityviews/city');
});

module.exports = router;