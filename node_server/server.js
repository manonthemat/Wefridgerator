var http = require('http');
var greenBean = require('green-bean');

var FRIDGE;
var VALUE;


greenBean.connect('refrigerator', function(fridge) {
  console.log('connected to fridge');
  FRIDGE = fridge;
//  readTemp();
//  var state = fridge.doorState.read(function(ds) { console.log(ds); });
});

function readTemp() {
  FRIDGE.displayTemperature.read(function(value) {
    //value = JSON.stringify(value);
    //console.log('Temperature: ' + value);
    var fresh = value['freshFoodTemperature'];
    var freezer = value['freezerTemperature'];
    console.log("Fresh: " + fresh + "\nFreezer: " + freezer);
    postTemp(fresh, freezer);
  });
}

function postTemp(freshFoodTemp, freezerTemp) {
  var url = 'http://localhost:3000/freezer/'+freshFoodTemp+'/'+freezerTemp;
  http.get(url, function(resp) {
//    console.log(resp);
  });
};

var server = http.createServer();
server.on('request', function(req, resp) {
  resp.writeHead(200, {'Content-Type': 'JSON', 'Access-Control-Allow-Origin': '*'});
  readTemp();
  resp.end('updating temperature');
});

server.listen(process.argv[2]||1337);
