var http = require('http');
var greenBean = require('green-bean');
var url = require('url');

var FRIDGE;

greenBean.connect('refrigerator', function(fridge){
  console.log('connected to fridge');
  FRIDGE = fridge;
});

http.createServer(function (request, response) {

  var url_parts = url.parse(request.url, true);
  var query = url_parts.query;
  console.log(query);

  var objToJson = {};

  response.writeHead(200, {
      'Content-Type': 'JSON',
      'Access-Control-Allow-Origin' : '*'
  });

  if(query.action === 'getTemp'){
    if(FRIDGE){
      objToJson = {
        freshDisplay: FRIDGE.displayTemperature.freshFoodTemperature,
        freezerDisplay: FRIDGE.displayTemperature.freezerTemperature,
        freshWanted: FRIDGE.setpointTemperature.freshFoodTemperature,
        freezerWanted: FRIDGE.setpointTemperature.freezerTemperature
      }      
    } else {
      objToJson = {
        error: 'no fridge to connect to'
      }
    }
  }

  response.end(JSON.stringify(objToJson));

}).listen(9876);