'user strict';
var Graph = function(ctx){
  this.ctx = ctx;
  this.w = ctx.canvas.width;
  this.h = ctx.canvas.height;
  this.nGraphs = 1;
  this.x = 0;
  this.y1 = 0;
  this.space = 0;
  this.oneGraphHeight = ctx.canvas.height;

  this.currentGraph = 0;
  this.topSpace = 0;

  this.cleanWidth = 20;
};

Graph.prototype.setNGraphs = function(n) {
  this.nGraphs = n;
  this.space = 50;
  this.oneGraphHeight = (this.h - ((this.nGraphs -1) * this.space)) / this.nGraphs;
};

Graph.prototype.draw = function (raw){
  var Celcius = this.toCelcius(raw);
  var Normalized = this.reMap(Celcius, 150, this.oneGraphHeight);

  this.clean();
  this.drawScale();
  this.lineTo(Normalized);
  this.y1 = Normalized;
  this.x ++;

  if( this.x >= this.w){
    this.x = 0;
    this.switchGraph();
  }

};

Graph.prototype.drawScale = function () {
  //every 10º
  var nLines = 150/10;
  var nLinesSpace = this.oneGraphHeight / nLines;

  for (var i = 0; i <= nLines; i++) {
    this.ctx.save();
      this.ctx.beginPath();
      this.ctx.moveTo(this.x, i*nLinesSpace + this.topSpace );
      this.ctx.lineTo(this.x+20,  i*nLinesSpace + this.topSpace  );
      this.ctx.strokeStyle = "#FFFFFF";
      this.ctx.stroke();
    this.ctx.restore();
  }

  //yAxis Lines



};

Graph.prototype.clean = function() {
  this.ctx.save();
    this.ctx.fillStyle = "#19436E";
    this.ctx.fillRect(this.x, this.topSpace, 20, this.oneGraphHeight);
  this.ctx.restore();
};

Graph.prototype.switchGraph = function() {
  this.currentGraph++;
  if (this.currentGraph == this.nGraphs ) {
    this.currentGraph = 0;
  }
  this.topSpace = (this.currentGraph * this.oneGraphHeight) + (this.currentGraph * this.space);
};

Graph.prototype.lineTo = function (normalized) {
  this.ctx.save();
    this.ctx.beginPath();
    this.ctx.moveTo(this.x, (this.oneGraphHeight +this.topSpace - this.y1) );
    this.ctx.lineTo(this.x+1, (this.oneGraphHeight +this.topSpace - normalized) );
    this.ctx.lineWidth=2;
    this.ctx.strokeStyle = "#F82727";
    this.ctx.stroke();
  this.ctx.restore();
};

Graph.prototype.toCelcius = function(raw) {
  return raw / 2.049;
};

Graph.prototype.reMap = function(val, end1, end2) {
  return  (val*end2) / end1 ;
};

Graph.prototype.moveEl = function(element) {
  console.log(this.x);
  element.style.left = this.x + 10 +"px";
  element.style.top = this.oneGraphHeight +this.topSpace - this.y1 - 30 + "px";
};
