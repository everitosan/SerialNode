var dataContainer = document.getElementById("value");
var socket = io.connect('http://localhost:3000');

//Global for graphing
var canvas = document.getElementById("canvas");
var x=0,
    y1 = 0,
    y2 = 0,
    w = window.innerWidth,
    h = window.innerHeight;


canvas.width = w;
canvas.height = h;

var ctx = canvas.getContext("2d");
socket.on('dataUpdate', function (data) {
  dataContainer.innerHTML = data.value;
  ctx.save();
    y2 = reMap(data.value, 1023, h );
    ctx.beginPath();
    ctx.moveTo(x, (h-y1) );
    ctx.lineTo(x+1, (h-y2) );
    ctx.strokeStyle = "#1DBE73";
    ctx.stroke();
  ctx.restore();

  ctx.save();
    ctx.fillStyle = "#18493E";
    ctx.fillRect(x+2, 0, 20, h);
  ctx.restore();

  x++;
  y1 = y2;

  if (x >= w) {
    x = 0;
    ctx.save();
      ctx.fillStyle = "#18493E";
      ctx.fillRect(x, 0, 20, h);
    ctx.restore();
  }
});

function reMap(val, end1, end2) {
  return  (val*end2) / end1 ;
}
