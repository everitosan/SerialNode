//socket.io server
var express = require('express');
var app = express();
var path = require('path');
var server = require('http').Server(app);
var io = require('socket.io')(server);

//serial class for readen values from sensor
var serial = require("./SerialClass");
var sensor = new serial();

//Index page load
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});
//set directory for static files
app.use(express.static(path.join(__dirname, 'public')));

//port for the server
server.listen(3000);

io.on('connection', function (socket) {

  socket.setMaxListeners(Infinity);
  sensor.printDevices();
  sensor.init("/dev/cu.usbserial", "9600");
  sensor.readData(function(data) {
    //emmit event for js at index.html
    data = data.substring(1);
    socket.emit('dataUpdate', { value: data });
    socket.on('Client says', function (data) {
      console.log(data);
    });
  });



});
