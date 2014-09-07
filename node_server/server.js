var http = require('http');
var greenBean = require('green-bean');

var FRIDGE;
var VALUE;

var M2X = require('m2x');
var m2x = new M2X('129fed7301f75579a6e219fdb89d0fec');


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
  var url = 'http://okfridge.herokuapp.com/freezer/'+freshFoodTemp+'/'+freezerTemp;
  http.get(url, function(resp) {
//    console.log(resp);
  });
};

function updateM2X(val) {
  m2x.feeds.updateStreamValue('3985731ebf9470cf94da51881329fbc3', 'fridge', { "value": val }, function(data) {
    console.log(data);
  });
}

var server = http.createServer();
server.on('request', function(req, resp) {
  resp.writeHead(200, {'Content-Type': 'JSON', 'Access-Control-Allow-Origin': '*'});
  readTemp();
  resp.end('updating temperature');
});

server.listen(process.argv[2]||1337);
