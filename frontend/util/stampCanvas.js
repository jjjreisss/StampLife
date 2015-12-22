var StampCanvas = function(id, width, height) {
  this.canvas = document.getElementById(id);
  this.canvas.width = width;
  this.canvas.height = height;
  this.ctx = this.canvas.getContext('2d');
  this.img = new Image();
  this.scale = 1;
};

StampCanvas.prototype.width = function () {
  return this.canvas.width;
};

StampCanvas.prototype.height = function () {
  return this.canvas.height;
};

StampCanvas.prototype.loadImage = function (url) {
  this.img = new Image();
  this.img.crossOrigin="anonymous";
  this.img.src = url;
  this.img.onload = function() {
    this.ctx.drawImage(this.img, 0, 0, 500, 500, 0, 0, 150, 150);
    console.log(this.img.src);
  }.bind(this);
};

StampCanvas.prototype.getImageData = function () {
  return this.ctx.getImageData(0,0,this.width(),this.height());
};

StampCanvas.prototype.putImageData = function (imageData) {
  this.clear();
  this.ctx.putImageData(imageData, 0, 0);
};

StampCanvas.prototype.toData = function () {
  return this.canvas.toDataURL("image/png");
};

StampCanvas.prototype.clear = function () {
  this.ctx.clearRect(0, 0, this.width(), this.height());
};

StampCanvas.prototype.scaleUp = function () {
  this.scale = this.scale * 1.2;
  var newWidth = 150 * this.scale;
  var newHeight = 150 * this.scale;
  this.canvas.width = newWidth;
  this.canvas.height = newHeight;

  this.ctx.drawImage(
    this.img, 0, 0, 500, 500,
              0, 0, newWidth, newHeight
            );
};

StampCanvas.prototype.scaleDown = function () {
  this.scale = this.scale / 1.2;
  var newWidth = 150 * this.scale;
  var newHeight = 150 * this.scale;
  this.canvas.width = newWidth;
  this.canvas.height = newHeight;

  this.ctx.drawImage(
    this.img, 0, 0, 500, 500,
              0, 0, newWidth, newHeight
            );
};

module.exports = StampCanvas;
