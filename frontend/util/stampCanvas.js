var StampCanvas = function(id, length, width) {
  this.length = length;
  this.width = width;
  this.canvas = document.getElementById(id);
  this.canvas.width = length;
  this.canvas.height = width;
  this.ctx = this.canvas.getContext('2d');
}

StampCanvas.prototype.loadImage = function (url) {
  var img = new Image();
  img.crossOrigin="anonymous";
  img.src = url;
  img.onload = function() {
    this.ctx.drawImage(img, 0, 0);
  }.bind(this);
};

StampCanvas.prototype.getImageData = function () {
  return this.ctx.getImageData(0,0,this.width,this.length);
};

StampCanvas.prototype.putImageData = function (imageData) {
  this.clear();
  this.ctx.putImageData(imageData, 0, 0);
};

StampCanvas.prototype.toData = function () {
  return this.canvas.toDataURL("image/png");
};

StampCanvas.prototype.clear = function () {
  this.ctx.clearRect(0, 0, this.width, this.length);
};

module.exports = StampCanvas;
