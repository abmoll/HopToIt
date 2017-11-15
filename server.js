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

app.get('/mainMap', function(req,res){
    res.sendFile("./public/googleMaps.html", {root: './'});
})
app.get('/testing', function(req,res){
    res.sendFile("./public/testing.html", {root: './'});
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
