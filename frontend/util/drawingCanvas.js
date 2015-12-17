var ApiUtil = require('./apiUtil');

var DrawingCanvas = function(id) {
  this.drawingCanvas = document.getElementById(id);
  this.drawingCanvas.width = 500;
  this.drawingCanvas.height = 500;
  this.ctx = this.drawingCanvas.getContext('2d');
  this.prevX = 0;
  this.prevY = 0;
  this.currX = 0;
  this.currY = 0;
  this.drawing = false;
  this.rgbString = "black";
};

DrawingCanvas.prototype.mouseDown = function (e, color, size) {
  this.color = color;
  this.size = size;
  this.drawing = true;
};

DrawingCanvas.prototype.mouseUp = function (e) {
  this.drawing = false;
};

DrawingCanvas.prototype.mouseMove = function (e) {
  this.prevX = this.currX;
  this.prevY = this.currY;

  this.currX = (e.clientX - this.drawingCanvas.offsetLeft);
  this.currY = (e.clientY-this.drawingCanvas.offsetTop);

  if (this.drawing) {
    this.draw();
  }
};

DrawingCanvas.prototype.draw = function () {
  this.ctx.beginPath();
  this.ctx.moveTo(this.prevX, this.prevY);
  this.ctx.lineTo(this.currX, this.currY);

  this.ctx.strokeStyle = this.color;
  this.ctx.lineWidth = this.size;
  this.ctx.stroke();
  this.ctx.closePath();
};

DrawingCanvas.prototype.toData = function () {
  return this.drawingCanvas.toDataURL("image/png");
};

module.exports = DrawingCanvas;
