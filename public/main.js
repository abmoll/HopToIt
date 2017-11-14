$(document).ready(function() {
  console.log("ready!");
  //any code inside doc ready wont run until html is loaded on page

  var mainVm = new Vue({
      el: '#app',
      data: {
          breweries: [],
          newBrewery: {
              name: '',
              address: '',
              lat: '',
              long: ''
          }
      },
      methods: {
          addBrewery: function(event){
              event.preventDefault()
              // $().serialize() will grab all the named inputs in the form, and put their values into a url-encoded string
              $.post('/add', mainVm.newTodo, (data)=>{
                  //
                  mainVm.newTodo = {}
                  console.log(data)
                  mainVm.getFreshData()
                  //this.todos.push(data)
              })
          },

          removeBrewery: function(item){
              $.post('/remove', item,(data)=>{
                  mainVm.getFreshData()
                  //send the object to be removed
                  console.log(data)
              })
          },

          getFreshData: function(){
              $.get('/todo', function(data){
                  mainVm.todos = data
              })
          },
      },

      created: function(){
          this.getFreshData()
      }
  })

// add two different forms
  $("#form").submit(function(event) {
    event.preventDefault();
    var city = document.getElementById("locality").value;
    var state = document.getElementById("region").value;
    var zip = document.getElementById("postalCode").value;

    //if city or state has a value, then disable zip and vice versa
    //document.getElementById('foo').disabled = true;
    // $('#locality').keydown(function() {
    //   $("#postalCode").prop("disabled", true);
    // });

    $.get('/', function(data) {})

    $.get(`/api?locality=${city}&region=${state}`, function(body, status) {
      //$.get(`/api?postalCode=${zip}`, function(body, status) {
      //displayResults() function
      body = JSON.parse(body);
      console.log(body);
      console.log(body.data[0].brewery.name);
      console.log(body.data[0].streetAddress);
      console.log(body.data[0].latitude);
      console.log(body.data[0].longitude);
      console.log(body.data[0].website);
      for (var i in body.data) {
        if (i < 5) {
          $(".theScreen").append("<br><p>" + body.data[i].brewery.name)
          $(".theScreen").append("<p>" + body.data[i].streetAddress)
          $(".theScreen").append("<p>" + body.data[i].website + "</p>")
          // v-for and vue
        }
      }
    })

  })

});

  //$(".theScreen").append("<br><p>Asteroid Name: " + data.near_earth_objects[day][i].name + "</p>")
  //$(".theScreen").append("<p>Velocity MPH: " + Math.round(data.near_earth_objects[day][i].close_approach_data[0].relative_velocity.miles_per_hour) + "</p>")
  // $(".theScreen").append("<p>Max Diameter Feet: " + Math.round(data.near_earth_objects[day][i].estimated_diameter.feet.estimated_diameter_max) + "</p>")

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
