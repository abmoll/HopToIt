// var fund = 200;
// var weight = 0;
// var azamat = 0;
// var azamatCost = 25;
// var item = "";
// var flag = 0;
// var numItems = 0;
//$('#totFunds').val(fund);

$(document).ready(function() {
  console.log("ready!");
  //any code inside doc ready wont run until html is loaded on page

  $.get('/', function(data){

  })

  $.get('/api', function(body, status) {
    //console.log(body)
    body = JSON.parse(body);
    console.log(body);
  })

});

//
//   $('#azamatplus').click(function(event) {
//     event.preventDefault();
//     fund = fund - azamatCost;
//     //check if funds are enough function
//
//     $('#totFunds').val(fund)
//     weight = weight + 10;
//     $('#totWeight').val(weight)
//     azamat++
//     document.getElementById("azamat").innerHTML = azamat;
//   });
//
//   $('#azamatminus').click(function() {
//     alert("subtracted azamat")
//     azamat--
//   });
//
//   $('#validate').click(function() {
//     alert("validating")
//     if (document.getElementById('totFunds').value < 0) {
//       alert("you do not have enough funds")
//       document.getElementById("validate").style.border = "thick solid #DC143C";
//     }
//     if (document.getElementById('totFunds').value > 0) {
//       //document.getElementById("validate").style.border = "thin solid #000000";
//     }
//     if (document.getElementById('totWeight').value > 200) {
//       alert("you have exceeded your weight limit")
//       document.getElementById("validate").style.border = "thick solid #DC143C";
//     }
//     if (document.getElementById('totWeight').value < 200) {
//       //document.getElementById("validate").style.border = "thin solid #000000";
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
//
//   $('#baywatchplus').click(function() {
//     alert("added baywatch")
//   });
//
//   function subtractFunds(amount) {
//     funds = funds - amount;
//   }
//
//if cargo is valid do this,

//send start and end dates to the server
// for (var i in hazardous) {
//   // for loop around hazardous .append hazardous.name ...
//   $(".theScreen").append("<br><p>Asteroid Name: " + hazardous[i].name + "</p>")
//   $(".theScreen").append("<p>Velocity MPH: " + Math.round(hazardous[i].close_approach_data[0].relative_velocity.miles_per_hour) + "</p>");
//   $(".theScreen").append("<p>Max Diameter Feet: " + Math.round(hazardous[i].estimated_diameter.feet.estimated_diameter_max) + "</p>");
//   $(".theScreen").append("<p>Distance from Earth in Miles: " + hazardous[i].close_approach_data[0].miss_distance.miles + "</p>");
// }
