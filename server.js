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

app.get('/', function(request, response) {
    response.sendFile('./public/index.html', {root: './'})
})

app.get('/api', function(req, res) {
  console.log(req.query);
  var breweryUrl = `http://api.brewerydb.com/v2/?key=58bc55fe9138082bf63a6f6ff8c1c861`;
  request(breweryUrl, function(err, response, body) {
    console.log("started API request");
    //console.log(body)
    res.send(body);
  })
})

app.listen(8080, function() {
  console.log('The app is running on 8080');
})

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
// app.get('/doublecandy', function(req, res) {
//   FoodModel.find({
//     name: 'CottonCandy'
//   }, function(err, data)) {
//     data[0].calories = data[0].calories * 2
//     data[0].save(function() {
//       res.send(data[0])
//       res.send(data)
//     })
//   })
// })
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
// app.get('/', function(req, res)) {
//     var newFood = new FoodModel({
//       name: 'Candy Corn',
//       calories = 50
//     })
//     newFood.save(function(err) {
//           // error here if object does not match schema
//           if err {
//             res.send(err)
//           } else {
//             res.send('saved the food')
//           }
//         }
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
//         app.get('/hello', function(request, response) {
//           response.send("Hello World");
//         })
//
//
//         app.get('/Home', function(request, response) {
//           response.sendFile('./public/index.html', {
//             root: './'
//           })
//           // response.send("Web page made by Alex")
//         })
//
//         app.get('/SanFran', function(request, response) {
//           response.sendFile('./public/SanFran.html', {
//             root: './'
//           })
//           // response.send("Web page made by Alex")
//         })
//
//         app.get('/Boulder', function(request, response) {
//           response.sendFile('./public/Boulder.html', {
//             root: './'
//           })
//           // response.send("Web page made by Alex")
//         })
//
//         app.get('/NewYork', function(request, response) {
//           response.sendFile('./public/NewYork.html', {
//             root: './'
//           })
//           // response.send("Web page made by Alex")
//         }) app.get('/Barcelona', function(request, response) {
//           response.sendFile('./public/Barcelona.html', {
//             root: './'
//           })
//           // response.send("Web page made by Alex")
//         }) app.get('/Rome', function(request, response) {
//           response.sendFile('./public/Rome.html', {
//             root: './'
//           })
//           // response.send("Web page made by Alex")
//         })
