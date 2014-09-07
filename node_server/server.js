var http = require('http');
var greenBean = require('green-bean');

var FRIDGE;

greenBean.connect('refrigerator', function(fridge) {
  console.log('connected to fridge');
  FRIDGE = fridge;
  readTemp();
//  var state = fridge.doorState.read(function(ds) { console.log(ds); });
});

function readTemp() {
  FRIDGE.displayTemperature.read(function(value) {
    console.log('Temperature: ' + JSON.stringify(value));
    return value;
  });
}

var server = http.createServer();
server.on('request', function(req, resp) {
  resp.writeHead(200, {'Content-Type': 'JSON', 'Access-Control-Allow-Origin': '*'});
  resp.end((readTemp()));
});

server.listen(1337);
