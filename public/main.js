$(document).ready(function() {
  console.log("ready!");
  //any code inside doc ready wont run until html is loaded on page

  $("#form").submit(function(event) {
    event.preventDefault();
    var city = document.getElementById("locality").value;
    var state = document.getElementById("region").value;
    var zip = document.getElementById("postalCode").value;

    $.get('/', function(data){
    })

    $.get(`/api?locality=${city}&region=${state}`, function(body, status) {
    //$.get(`/api?locality=${city}&end_date=${state}`, function(body, status) {
      body = JSON.parse(body);
      console.log(body);
    })
  })

  $(".theScreen").append("<br><p>Asteroid Name: " + data.near_earth_objects[day][i].name + "</p>")
  //$(".theScreen").append("<p>Velocity MPH: " + Math.round(data.near_earth_objects[day][i].close_approach_data[0].relative_velocity.miles_per_hour) + "</p>")
  // $(".theScreen").append("<p>Max Diameter Feet: " + Math.round(data.near_earth_objects[day][i].estimated_diameter.feet.estimated_diameter_max) + "</p>")


});

//   $('#validate').click(function() {
//     alert("validating")
//     if (document.getElementById('totFunds').value < 0) {
//       alert("you do not have enough funds")
//       document.getElementById("validate").style.border = "thick solid #DC143C";
//     }
//     }
//     $.post("/validate-cargo", {
//         weight: weight,
//         fund: fund,
//         stuff: [{
//             //item: "azamat",
//             item: "azamat",
//             numItems: azamat
//           },
//           {
//             item: "flag",
//             numItems: flag
//           }
//         ]
//       },
//       function(data, status) {
//         alert("Data: " + data + "\nStatus: much " + status);
//       });
//   });
//

//send start and end dates to the server
// for (var i in hazardous) {
//   // for loop around hazardous .append hazardous.name ...
//   $(".theScreen").append("<br><p>Asteroid Name: " + hazardous[i].name + "</p>")
//   $(".theScreen").append("<p>Velocity MPH: " + Math.round(hazardous[i].close_approach_data[0].relative_velocity.miles_per_hour) + "</p>");
//   $(".theScreen").append("<p>Max Diameter Feet: " + Math.round(hazardous[i].estimated_diameter.feet.estimated_diameter_max) + "</p>");
//   $(".theScreen").append("<p>Distance from Earth in Miles: " + hazardous[i].close_approach_data[0].miss_distance.miles + "</p>");
// }
