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

    removeBrewery: function(item, index, event) {
      //console.log(index)
      event.preventDefault();
      item.hidden = true;
      //console.log("item: " + item)
      //var dbId = {id: objectid}
      mainVm.breweries.splice(1,index)

      // $.post('/remove', dbId, (data)=>{
      // db.collection.deleteOne()
      //   db remove command sendDB_ID
      //   mainVm.$forceUpdate();
      //   send the object to be removed
      // console.log("data: " + data)
      // })
    },
    addBrewery: function(item, event) {
      event.preventDefault();
      console.log("item: " + item)
      mainVm.breweries.push(item)
      //$.post('/remove', item,(data)=>{
      //       mainVm.getFreshData()
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
