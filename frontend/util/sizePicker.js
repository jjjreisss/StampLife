var SizePicker = function (id) {
  this.sizePickerCanvas = document.getElementById(id);
  this.sizePickerContext = this.sizePickerCanvas.getContext('2d');
  var pickerImg = new Image();
  pickerImg.src = '../assets/triangle.png';
  pickerImg.onload = function() {
    this.sizePickerContext.drawImage(pickerImg, 0, 0);
  }.bind(this);
};

SizePicker.prototype.pickSize = function (e) {
  var x = e.pageX - this.sizePickerCanvas.offsetLeft;
  return (x-35) * 52 / 423;
};


module.exports = SizePicker;
