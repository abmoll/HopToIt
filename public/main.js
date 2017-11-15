//any code inside doc ready wont run until html is loaded on page

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
    }
  },
  methods: {

    removeBrewery: function(item, event) {
      event.preventDefault();
      item.hidden = true;
      //   $.post('/remove', item,(data)=>{
      //       mainVm.getFreshData()
      //       //send the object to be removed
      //       console.log(data)
      //  })
    },
  },
})

// add two different forms
$("#form").submit(function(event) {
  event.preventDefault();
  var city = document.getElementById("locality").value;
  var state = document.getElementById("region").value;
  var zip = document.getElementById("postalCode").value;

  $.get('/', function(data) {})

  $.get(`/api?locality=${city}&region=${state}`, function(body, status) {
    //$.get(`/api?postalCode=${zip}`, function(body, status) {
    //displayResults() function
    if (city !== '' && state !== '') {
      body = JSON.parse(body);
      if (body.data !== undefined) {
        for (var i = 0; i < body.data.length; i++) {
          body.data[i].hidden = false;
        }
        console.log(body);
      }
      mainVm.breweries = body.data;
    }
  })

  $.get(`/apiZip?postalCode=${zip}`, function(body, status) {
    //displayResults() function
    if (zip !== '') {
      body = JSON.parse(body);
      console.log(body.data);
      if (body.data !== undefined) {
        for (var i = 0; i < body.data.length; i++) {
          body.data[i].hidden = false;
        }
      }
      mainVm.breweries = body.data;
    }
  })

})
