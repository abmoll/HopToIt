//server.js

var express = require('express')
var app = express()
var bodyParser = require('body-parser')
const request = require('request');

app.use(express.static('./public'))

app.use(bodyParser.urlencoded({
    extended: true
}))

app.use(bodyParser.json())

app.get('/server', function(request, response) {
    response.sendFile("./public/directions.html", {root: './'});
    console.log("yes")
});

app.get('/api', function(req, res) {
  console.log(req.query);
  //var breweryUrl = `http://api.brewerydb.com/v2/beers?name=Fat+Tire&key=58bc55fe9138082bf63a6f6ff8c1c861`;
  //var breweryUrl = `http://api.brewerydb.com/v2/locations?postalCode=80516&key=58bc55fe9138082bf63a6f6ff8c1c861`;
  //var breweryUrl = `http://api.brewerydb.com/v2/locations?locality=Windsor&key=58bc55fe9138082bf63a6f6ff8c1c861`;
  var breweryUrl = `http://api.brewerydb.com/v2/locations?locality=${req.query.locality}&region=${req.query.region}&key=58bc55fe9138082bf63a6f6ff8c1c861`;
  //var breweryUrl = `http://api.brewerydb.com/v2/locations?region=Colorado&key=58bc55fe9138082bf63a6f6ff8c1c861`;
  request(breweryUrl, function(err, response, body) {
    console.log("started API request");
    console.log(response)
    console.log(body)
    //res.send(response)
    res.send(body)
  })
})

app.listen(8080, function() {
  console.log('The app is running on 8080');
})


// ************* Database stuff for reference ********************
// var mongoose = require('mongoose') // we dont need mongo since mongoose
// mongoose.connect('mongodb://localhost:27017/roadtrip', {
//   useMongoClient: true
// })
//
// //create a schema that defines properties of valid roadtrip document
// var tripschema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   calories: {
//     type: Number,
//     required: true,
//   },
//   delicious: {
//     type: Boolean,
//     required: true
//   }
// })
//
// //create a model
// var TripModel = mongoose.model('Food', foodSchema)
//
//
// app.get('/allfood'),
//   function(req, res) {
//     FoodModel.find({})
//     function(err, data) {
//       //data is an array of every food object
//       res.send(data)
//     })
// })
//

//
//
//         app.post('/validate-cargo', function(request, response) {
//           // if (fund<0){
//           // console.log("insufficient funds")}
//           console.log(request.body);
//           console.log("weight" + request.body.weight);
//           console.log("fund" + request.body.fund);
//           console.log(request.body.stuff[0].item);
//           console.log(request.body.stuff[0].numItems);
//           if (request.body.weight > 200) console.log("you are over your weight limit")
//           if (request.body.fund < 0) console.log("you have run out of funds")
//           response.send("got your data!")
//         })
//
//
