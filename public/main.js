//any code inside doc ready wont run until html is loaded on page

// import 'vue-googlemaps/dist/vue-googlemaps.css';
// import VueGoogleMaps from 'vue-googlemaps';
//
// Vue.use(VueGoogleMaps, {
//   load: {
//     apiKey: 'AIzaSyC46J7DlCyI-jZLtGueSXja2uDkdDEJYRA',
//     libraries: ['places'],
//   },
// })

var mainVm = new Vue({
  el: '#app',
  data: {
    breweries: [],
    newBrewery: {
      name: '',
      address: '',
      lat: '',
      long: '',
      website: ''
    },
    breweryString: [],
  },

  // watch: {
  //     breweries: function() {
  //         if (this.breweries.length > 0) this.buildPins();
  //     },

  // },

  methods: {

    removeBrewery: function(item, index, event) {
      //console.log(index)
      event.preventDefault();
      item.hidden = true;
      //console.log("item: " + item)
      //var dbId = {id: objectid}
      mainVm.breweries.splice(1,index)
      $.post('/remove', item, (data)=>{
        mainVm.$forceUpdate();
      })
    },

    addBrewery: function(item, event) {
      event.preventDefault();
      //mainVm.breweries.push(item)
      $.post('/add', item, (data)=>{

      })
    },


    initMap: function() {
      this.directionsService = new google.maps.DirectionsService;
      this.directionsDisplay = new google.maps.DirectionsRenderer;

          console.log("map: ", google.maps)
              this.map = new google.maps.Map(document.getElementById('map'), {
              center: {lat:61.180059, lng: -149.822075},
              scrollwheel: false,
              zoom: 4
            });
        this.directionsDisplay.setMap(this.map);
        if (mainVm.breweries.length > 0) {

          $("#map").append(`<div id="infowindowcontent">
              <span id="place-name" class="title"></span><br>
              <span id="place-id"></span><br>
              <span id="place-address"></span>
            </div>`);
            mainVm.buildPins();
        }
    },

    buildPins: function() {
      var vm = this;
      var address = mainVm.breweries
      console.log(address)
      console.log(typeof address)
      // libraries to get place information
      var infowindow = new google.maps.InfoWindow();
      var infowindowContent = document.getElementById('infowindowcontent')
      var service = new google.maps.places.PlacesService(vm.map);
      var geocoder = new google.maps.Geocoder;
      // Build the marker pins
      for (var i=0; i < address.length; i++) {
        // run geocoder to turn string into usable coordinates
          geocoder.geocode({'address': address[i].streetAddress + address[i].region}, function(results, status) {
            if (status === 'OK') {
              // sets map zoom level
              vm.map.setZoom(12)
              // sets map center at first brewery in the list
              vm.map.setCenter(results[0].geometry.location);
            }
            // error handling for geocoder
            else {
              alert('Geocode was not successful for the following reason: ' + status);
            }
            // build a pin and place it at the position (location came from string passed into geocoder)
            var marker = new google.maps.Marker({
              // what map to place pin on
              map: vm.map,
              // where to place pin (in a callback function so we are accessing the data after geocode returns our data in `results`)
              position: results[0].geometry.location
            });

          // call google places service for detailed information about the location
          service.getDetails({placeId: results[0].place_id}, function(place, status) {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
                console.log(this.place);
            }
          });

          // Add an on click event to the marker that will open a display box with brewery information
          marker.addListener('click', ()=>{
            console.log(results);
            // set the contents of the markers text box
            infowindow.setContent(`'<div><strong>Brewery '   '</strong><br>'
            'Address: '  ${mainVm.breweries[i]} '<br>`);
            // open the display box
            infowindow.open(map, marker);
          });
        });
      }
    }

  },
})

// add two different forms
$("#form").submit(function(event) {
  event.preventDefault();
  var city = document.getElementById("locality").value;
  var state = document.getElementById("region").value;
  var zip = document.getElementById("postalCode").value;

  //
  $.get(`/api?locality=${city}&region=${state}`, function(body,status) {
    //$.get(`/api?postalCode=${zip}`, function(body, status) {
    //displayResults() function
    if (city !== '' && state !== '') {
      body = JSON.parse(body);
      if (body.data !== undefined) {
        for (var i = 0; i < body.data.length; i++) {
          body.data[i].hidden = false;
        }

      }
      mainVm.breweries = body.data;
    }
  })

  $.get(`/apiZip?postalCode=${zip}`, function(body, status) {
    //displayResults() function
    if (zip !== '') {
      body = JSON.parse(body);

      var address = [];
      if (body.data !== undefined) {
        for (var i = 0; i < body.data.length; i++) {
          body.data[i].hidden = false;
          address.push(body.data[i].brewery.name);
        }
        // console.log(body);
        mainVm.breweryString = address;
        console.log(mainVm.breweryString)
      }
      mainVm.breweries = body.data
      mainVm.initMap();

    }
    console.log(typeof mainVm.breweryString)
  })
})


//
// function initMap(breweryNames) {
//   console.log(breweryNames)
//   var map = new google.maps.Map(document.getElementById('map'), {
//     zoom: 8,
//     center: {lat: -34.397, lng: 150.644}
//   });
//   var geocoder = new google.maps.Geocoder;
//   // libraries to get place information
//   var infowindow = new google.maps.InfoWindow();
//   var infowindowContent = document.getElementById('infowindowContent')
//   infowindow.setContent(infowindowContent);
//   var service = new google.maps.places.PlacesService(map);
//
//
// //   geocodeAddress(geocoder, map);
// //
// // }
// //
// // function geocodeAddress(geocoder, resultsMap) {
//
//   // store location names in an array of strings
//
//
//
//
//
// console.log(address)
//
//
//
//   // loop over array and make a marker for each brewery
//   for (var i=0; i < address.length; i++) {
//
//
//     geocoder.geocode({'address': address[i]}, function(results, status) {
//
//       service.getDetails({
//
//         placeId: results[0].place_id}, function(place, status) {
//           if (status === google.maps.places.PlacesServiceStatus.OK) {
//             // console.log(place)
//
//       if (status === 'OK') {
//         // console.log(place)
//         map.setCenter(results[0].geometry.location);
//         console.log(results[0].place_id)
//         var marker = new google.maps.Marker({
//           map: map,
//           position: results[0].geometry.location
//         });
//       } else {
//         alert('Geocode was not successful for the following reason: ' + status);
//       }
//     }
//
//
//   })
//     });
//   }
// }
