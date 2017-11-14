// var map;
// // Create a new blank array for all the listing markers.
// var markers = [];
// function initMap() {
//   // Constructor creates a new map - only center and zoom are required.
//   map = new google.maps.Map(document.getElementById('map'), {
//     center: {lat: 40.7413549, lng: -73.9980244},
//     zoom: 13,
//     mapTypeControl: false
//   });
//   // These are the real estate listings that will be shown to the user.
//   // Normally we'd have these in a database instead.
//   var locations = [
//     {title: 'Park Ave Penthouse', location: {lat: 40.7713024, lng: -73.9632393}},
//     {title: 'Chelsea Loft', location: {lat: 40.7444883, lng: -73.9949465}},
//     {title: 'Union Square Open Floor Plan', location: {lat: 40.7347062, lng: -73.9895759}},
//     {title: 'East Village Hip Studio', location: {lat: 40.7281777, lng: -73.984377}},
//     {title: 'TriBeCa Artsy Bachelor Pad', location: {lat: 40.7195264, lng: -74.0089934}},
//     {title: 'Chinatown Homey Space', location: {lat: 40.7180628, lng: -73.9961237}}
//   ];
//   var largeInfowindow = new google.maps.InfoWindow();
//   // The following group uses the location array to create an array of markers on initialize.
//   for (var i = 0; i < locations.length; i++) {
//     // Get the position from the location array.
//     var position = locations[i].location;
//     var title = locations[i].title;
//     // Create a marker per location, and put into markers array.
//      var marker = new google.maps.Marker({
//       position: position,
//       title: title,
//       animation: google.maps.Animation.DROP,
//       id: i
//     });
//     // Push the marker to our array of markers.
//     markers.push(marker);
//     // Create an onclick event to open an infowindow at each marker.
//     marker.addListener('click', function() {
//       populateInfoWindow(this, largeInfowindow);
//     });
//   }
//   document.getElementById('show-listings').addEventListener('click', showListings);
//   document.getElementById('hide-listings').addEventListener('click', hideListings);
// }
// // This function populates the infowindow when the marker is clicked. We'll only allow
// // one infowindow which will open at the marker that is clicked, and populate based
// // on that markers position.
// function populateInfoWindow(marker, infowindow) {
//   // Check to make sure the infowindow is not already opened on this marker.
//   if (infowindow.marker != marker) {
//     infowindow.marker = marker;
//     infowindow.setContent('<div>' + marker.title + '</div>');
//     infowindow.open(map, marker);
//     // Make sure the marker property is cleared if the infowindow is closed.
//     infowindow.addListener('closeclick', function() {
//       infowindow.marker = null;
//     });
//   }
// }
// // This function will loop through the markers array and display them all.
// function showListings() {
//   var bounds = new google.maps.LatLngBounds();
//   // Extend the boundaries of the map for each marker and display the marker
//   for (var i = 0; i < markers.length; i++) {
//     markers[i].setMap(map);
//     bounds.extend(markers[i].position);
//   }
//   map.fitBounds(bounds);
// }
// // This function will loop through the listings and hide them all.
// function hideListings() {
//   for (var i = 0; i < markers.length; i++) {
//     markers[i].setMap(null);
//   }
// }

window.onload = function(){

var directionsDisplay;
var directionsService = new google.maps.DirectionsService();
var map;

function initialize() {
  directionsDisplay = new google.maps.DirectionsRenderer();
  var chicago = new google.maps.LatLng(41.850033, -87.6500523);
  var mapOptions = {
    zoom:7,
    center: chicago
  }
  map = new google.maps.Map(document.getElementById('map'), mapOptions);
  directionsDisplay.setMap(map);
}

function calcRoute() {
  var start = "chicago, il";
  var end = "flagstaff, az";
  var request = {
    origin: start,
    destination: end,
    travelMode: 'DRIVING'
  };
  directionsService.route(request, function(result, status) {
    if (status == 'OK') {
      directionsDisplay.setDirections(result);
    }
  });
}
}
