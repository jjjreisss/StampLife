var StrokeSample = function() {
  this.strokeSampleCanvas = document.getElementById('stroke-sample');
  this.strokeSampleContext = this.strokeSampleCanvas.getContext('2d');
};

StrokeSample.prototype.pickSample = function (color, size) {
  this.strokeSampleContext.clearRect(0,0,80,80);
  var centerX = 40;
  var centerY = 40;
  var left = centerX - size / 2;
  var top = centerY - size / 2;
  this.strokeSampleContext.fillStyle = color;

  this.strokeSampleContext.fillRect(top, left, size, size);
};

module.exports = StrokeSample;
