var ApiUtil = require('./apiUtil');
var StampStore = require('../stores/stampStore');
var BasicDrawingMethods = require('./basicDrawingMethods');

var DrawingCanvas = function(id, length, width) {
  this.length = length;
  this.width = width;
  this.canvas = document.getElementById(id);
  this.canvas.width = length;
  this.canvas.height = width;
  this.ctx = this.canvas.getContext('2d');
  this.prevX = 0;
  this.prevY = 0;
  this.currX = 0;
  this.currY = 0;
  this.rgbString = "black";
  this.ctx.lineJoin = this.ctx.lineCap = 'round';
  this.history = [this.getImageData(), this.getImageData(), this.getImageData(), this.getImageData(), this.getImageData()];
  this.outside = [];

  this.drawing = false;
  this.stamping = false;
};

$.extend(DrawingCanvas.prototype, BasicDrawingMethods);


module.exports = DrawingCanvas;
