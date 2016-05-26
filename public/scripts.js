var dataContainer = document.getElementById("value");
var socket = io.connect('http://localhost:3000');

//Global for graphing
var canvas = document.getElementById("canvas");
var reporter = document.getElementById("reporter");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight*.7;
var mGraph = new Graph(canvas.getContext("2d"));
mGraph.setNGraphs(2);


socket.on('dataUpdate', function (data) {
  reporter.innerHTML = Math.round(data.value / 2.049) + "º";
  mGraph.draw(data.value);
});
