var http = require('http');
var greenBean = require('green-bean');

var FRIDGE;
var VALUE;

var M2X = require('m2x');
var m2x = new M2X('960e2f4da5d1cee68a17b65eb2127cba');


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
//    postTemp(fresh, freezer);
    m2x.feeds.updateStreamValue('38dcdb5b1685de295f5bba72fe6569a0', 'freshtemperature', { "at": new Date().toISOString(), "value": fresh }, function(data) {
      console.log(data);
    });
    m2x.feeds.updateStreamValue('38dcdb5b1685de295f5bba72fe6569a0', 'freezertemperature', { "at": new Date().toISOString(), "value": freezer }, function(data) {
      console.log(data);
    });
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
