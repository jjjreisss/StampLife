var ColorPicker = function(id) {
  this.colorPickerCanvas = document.getElementById(id);
  this.colorPickerContext = this.colorPickerCanvas.getContext('2d');
  var pickerImg = new Image();
  pickerImg.src = './color-picker-80-500.png';
  pickerImg.onload = function() {
    this.colorPickerContext.drawImage(pickerImg, 0, 0);
  }.bind(this);
};

ColorPicker.prototype.pickColor = function (e) {
  var x = e.clientX - this.colorPickerCanvas.offsetLeft - this.colorPickerCanvas.offsetParent.offsetLeft -
    this.colorPickerCanvas.offsetParent.offsetParent.offsetLeft - this.colorPickerCanvas.offsetParent.offsetParent.offsetParent.offsetLeft;
  var y = e.clientY - this.colorPickerCanvas.offsetTop - this.colorPickerCanvas.offsetParent.offsetTop -
    this.colorPickerCanvas.offsetParent.offsetParent.offsetTop - this.colorPickerCanvas.offsetParent.offsetParent.offsetParent.offsetTop;
  var imgData = this.colorPickerContext.getImageData(x, y, 1, 1).data;
  var rgbArray = imgData.slice(0,3);
  this.rgbString = "rgb(" + rgbArray.join(",") + ")";
  return this.rgbString;
};

ColorPicker.prototype.color = function () {
  return this.rgbString;
};


module.exports = ColorPicker;
