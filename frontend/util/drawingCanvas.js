var ApiUtil = require('./apiUtil');

var DrawingCanvas = function(id, length, width) {
  this.length = length;
  this.width = width;
  this.drawingCanvas = document.getElementById(id);
  this.drawingCanvas.width = length;
  this.drawingCanvas.height = width;
  this.ctx = this.drawingCanvas.getContext('2d');
  this.prevX = 0;
  this.prevY = 0;
  this.currX = 0;
  this.currY = 0;
  this.drawing = false;
  this.rgbString = "black";
  this.ctx.lineJoin = this.ctx.lineCap = 'round';
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

DrawingCanvas.prototype.toImgData = function () {
  return this.ctx.getImageData(0,0,this.length, this.width);
};


DrawingCanvas.prototype.stamp = function (e, stampImg) {
  if (this.drawing) {
    this.currX = (e.clientX - this.drawingCanvas.offsetLeft);
    this.currY = (e.clientY-this.drawingCanvas.offsetTop);

    var img = new Image();
    img.src = stampImg;
    this.ctx.drawImage(img, this.currX-75, this.currY-75);
    // this.ctx.putImageData(stampImg, this.currX, this.currY);
  }
};

module.exports = DrawingCanvas;
