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
  var fresh, freezer;
  if(FRIDGE){
    FRIDGE.displayTemperature.read(function(value) {
      //value = JSON.stringify(value);
      //console.log('Temperature: ' + value);
      fresh = value['freshFoodTemperature'];
      freezer = value['freezerTemperature'];
      console.log("Fresh: " + fresh + "\nFreezer: " + freezer);
      postTemp(fresh, freezer);
    });
    return {fresh: fresh, freezer: freezer};
  } else {
    //if we aren't plugged into the fridge
    return {fresh: 55, freezer: 23};
  }
}

function readDoorState(){
  var doorState;
  if(FRIDGE){
    FRIDGE.doorState.read(function(value){
      doorState = value;
    });
  } else {
    doorState = 000000;
  }
  return doorState;
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
  var fridgeObj = {};
  var temp = readTemp();
  fridgeObj.fresh = temp.fresh;
  fridgeObj.freezer = temp.freezer;
  fridgeObj.doorState = readDoorState();
  resp.write(JSON.stringify(fridgeObj));
  resp.end();
});

server.listen(process.argv[2]||1337);
