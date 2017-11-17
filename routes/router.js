var express = require('express');
var router = express.Router();
var User = require('../models/user');
var app = express();
const request = require('request');
var path = require('path');

// GET route for reading data
// router.get('/', function (req, res, next) {
//   console.log("here")
//   return res.sendFile(path.join(__dirname + '/index.html'));
// });


// route for remove function
router.post('/remove', function(req,res){
  console.log(req.body)
  res.send("success")
})

router.post('/add', function(req,res){
  var address = req.body
  var user = req.session.userId
  console.log(user)
  // store address of brewery to send to database for saving
  var newAddress = `${address.streetAddress}, ${address.locality} `
  User.updateDB(newAddress, user, function(err, upUser){
    console.log("database updated")
    res.send(upUser)
  });
  console.log(newAddress)
})

// v if is logged in

//POST route for updating data
router.post('/signUp', function (req, res, next) {
  // confirm that user typed same password twice
  if (req.body.password !== req.body.passwordConf) {
    var err = new Error('Passwords do not match.');
    err.status = 400;
    res.send("passwords dont match");
    return next(err);
  }

  if (req.body.email &&
    req.body.username &&
    req.body.password &&
    req.body.passwordConf) {

    var userData = {
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
    }

    User.create(userData, function (error, user) {
      if (error) {
        return next(error);
      } else {
        req.session.userId = user._id;
        return res.redirect('/');
      }
    });
  } else {
    var err = new Error('All fields required.');
    err.status = 400;
    return next(err);
  }
})

// post request for login
router.post('/login', function(req,res,next){
  if (req.body.logemail && req.body.logpassword) {
   User.authenticate(req.body.logemail, req.body.logpassword, function (error, user) {
     if (error || !user) {
       console.log('router')
       var err = new Error('Wrong email or password.');
       err.status = 401;
       return next(err);
     } else {
       req.session.userId = user._id
       return res.redirect('/');
     }
   });
 }
});


router.get('/getData', function(req,res){
  User.findById(req.session.userId)
    .exec(function (error,user){
      console.log("working")
      if (error) {
         return next(err)
      }
      else{
        console.log(user.addresses, "this on server");
        res.send(user.addresses);

      }
    })
  })
// send session.userId

// GET route after registering
router.get('/getRoute', function (req, res, next) {
  User.findById(req.session.userId)
    .exec(function (error, user) {
      if (error) {
        return next(error);
      } else {
        if (user === null) {
          // var err = new Error(`Not authorized! Go back! <a type="button" href="/"> Home</a>`);
          // err.status = 400;
          // return next(err);
          res.sendFile("/public/notLoggedIn.html", {root:'./'})
        } else {
          next()
          // return res.send('<h1>Name: </h1>' + user.username + '<h2>Mail: </h2>' + user.email + '<br><a type="button" href="/logout">Logout</a>')
        }
      }
    });
});

// before create

router.get('/getRoute', function(req,res,next){
  console.log(req.body)

  res.sendFile("/public/drivingRoute.html", {root:'./'})
})

router.get('/next', function (req, res, next) {
  User.findById(req.session.userId)
    .exec(function (error, user) {
      if (error) {
        return next(error);
      } else {
        if (user === null) {
          var err = new Error("Not authorized! Go back and login!");
          err.status = 400;
          return next(err);
        } else {
          return res.send('<h1>got it</h1>')
        }
      }
    });
});



// GET for logout logout
router.get('/logout', function (req, res, next) {
  if (req.session) {
    // delete session object
    req.session.destroy(function (err) {
      if (err) {
        return next(err);
      } else {
        return res.redirect('/');
      }
    });
  }
});

// routes for api calls
router.get('/api', function(req, res) {
  // console.log(req.query);
  //var breweryUrl = `http://api.brewerydb.com/v2/beers?name=Fat+Tire&key=58bc55fe9138082bf63a6f6ff8c1c861`;
  var breweryUrl = `http://api.brewerydb.com/v2/locations?locality=${req.query.locality}&region=${req.query.region}&key=58bc55fe9138082bf63a6f6ff8c1c861`;
  request(breweryUrl, function(err, response, body) {
    // console.log("started API request");
    // console.log(response)
    // console.log(body)
    //res.send(response)
    res.send(body)
  })
})

router.get('/apiZip', function(req, res) {
  // console.log(req.query);
  var breweryUrl = `http://api.brewerydb.com/v2/locations?postalCode=${req.query.postalCode}&key=58bc55fe9138082bf63a6f6ff8c1c861`;
  request(breweryUrl, function(err, response, body) {
    //console.log(response)
    // console.log(body.data)
    //res.send(response)
    res.send(body)
  })
})


module.exports = router;
