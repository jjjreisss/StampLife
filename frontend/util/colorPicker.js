var ColorPicker = function(id) {
  this.colorPickerCanvas = document.getElementById(id);
  this.colorPickerContext = this.colorPickerCanvas.getContext('2d');
  var pickerImg = new Image();
  pickerImg.src = '../assets/color-picker-80-500.png';
  pickerImg.onload = function() {
    this.colorPickerContext.drawImage(pickerImg, 0, 0);
  }.bind(this);
};

ColorPicker.prototype.pickColor = function (e) {
  var x = e.pageX - this.colorPickerCanvas.offsetLeft;
  var y = e.pageY - this.colorPickerCanvas.offsetTop;
  var imgData = this.colorPickerContext.getImageData(x, y, 1, 1).data;
  var rgbArray = imgData.slice(0,3);
  this.rgbString = "rgb(" + rgbArray.join(",") + ")";
  return this.rgbString;
};


module.exports = ColorPicker;
