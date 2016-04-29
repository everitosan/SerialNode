var serialPort = require('serialport');
var SerialPort = serialPort.SerialPort;

var mySerial = function() {
  this.device = "";
  this.baud = 0;
  this.port;
};

mySerial.prototype.init = function(ndevice, baud){
  this.device = ndevice;
  this.baud = baud;
  this.port = new SerialPort(this.device, {
    baudrate: this.baud,
    parser: serialPort.parsers.readline('\n')
  })
};

mySerial.prototype.printDevices = function() {
  serialPort.list(function (err, ports) {
    ports.forEach(function(port) {
      console.log(port.comName);
    });
  });
};

mySerial.prototype.readData = function(callbackFn){
  this.port.on("data", function (data) {
    callbackFn(data);
  });
};


module.exports = mySerial;
