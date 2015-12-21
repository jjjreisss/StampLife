var ApiUtil = require('./apiUtil');
var StampStore = require('../stores/stampStore');

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
  this.rgbString = "black";
  this.ctx.lineJoin = this.ctx.lineCap = 'round';
  this.history = [null, null, null, null, null];

  this.drawing = false;
  this.stamping = false;
};

DrawingCanvas.prototype.mouseDown = function (e, color, size) {
  this.color = color;
  this.size = size;
  this.drawing = true;
  this.draw();
};

DrawingCanvas.prototype.mouseUp = function (e) {
  this.history.shift();
  this.history.push(this.getImageData());
  console.log(this.history);

  this.drawing = false;
};

DrawingCanvas.prototype.mouseOut = function (e) {
  this.drawing = false;
};

DrawingCanvas.prototype.mouseMove = function (e) {
  this.prevX = this.currX;
  this.prevY = this.currY;

  this.currX = (e.clientX - this.drawingCanvas.offsetLeft
    - this.drawingCanvas.offsetParent.offsetLeft
    - this.drawingCanvas.offsetParent.offsetParent.offsetLeft);
  this.currY = (e.clientY - this.drawingCanvas.offsetTop
    - this.drawingCanvas.offsetParent.offsetTop
    - this.drawingCanvas.offsetParent.offsetParent.offsetTop);

  if (this.drawing) {
    this.draw();
  } else {
    this.preview();
  }
};

DrawingCanvas.prototype.undo = function () {
  if(this.history[this.history.length - 2]) {
    this.history.unshift(null);
    this.history.pop();
    this.putImageData(this.history[this.history.length - 1]);
  }
};

DrawingCanvas.prototype.draw = function () {
  if (this.stamping) {
    this.drawStamp();
  } else {
    this.drawStroke();
  }
};

DrawingCanvas.prototype.preview = function () {
  if (this.stamping) {
    this.clear();
    if (this.history[this.history.length - 1]){
      this.putImageData(this.history[this.history.length - 1]);
    }
    this.drawStamp("transparent")
  }
};

DrawingCanvas.prototype.drawStamp = function (transparent) {
  if (transparent) {this.ctx.globalAlpha = 0.4}
  var img = new Image();
  img.src = this.stampImg;
  this.ctx.drawImage(img, this.currX-75, this.currY-75);
  this.ctx.globalAlpha = 1.0;
};

DrawingCanvas.prototype.drawStroke = function () {
  this.ctx.beginPath();
  this.ctx.moveTo(this.prevX, this.prevY);
  this.ctx.lineTo(this.currX, this.currY);
  this.ctx.strokeStyle = this.color;
  this.ctx.lineWidth = this.size;
  this.ctx.stroke();
  this.ctx.closePath();
};

DrawingCanvas.prototype.toggleStamping = function () {
  this.stamping = !this.stamping;
};

DrawingCanvas.prototype.toData = function () {
  return this.drawingCanvas.toDataURL("image/png");
};

DrawingCanvas.prototype.setStamp = function (stampImg) {
  this.stampImg = stampImg;
};

DrawingCanvas.prototype.clear = function () {
  this.ctx.clearRect(0, 0, this.width, this.length);
};

DrawingCanvas.prototype.loadImage = function (url) {
  var img = new Image();
  img.crossOrigin="anonymous";
  img.src = url;
  img.onload = function() {
    this.ctx.drawImage(img, 0, 0)
    console.log('loaded');
  }.bind(this);
};

DrawingCanvas.prototype.getImageData = function () {
  return this.ctx.getImageData(0,0,this.width,this.length);
};

DrawingCanvas.prototype.putImageData = function (imageData) {
  this.clear();
  this.ctx.putImageData(imageData, 0, 0);
};



module.exports = DrawingCanvas;
