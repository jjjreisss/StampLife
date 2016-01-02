var SizePicker = function (id) {
  this.sizePickerCanvas = document.getElementById(id);
  this.sizePickerContext = this.sizePickerCanvas.getContext('2d');
  var pickerImg = new Image();
  pickerImg.src = './triangle-v2.png';
  pickerImg.onload = function() {
    this.sizePickerContext.drawImage(pickerImg, 0, 0);
  }.bind(this);
};

SizePicker.prototype.pickSize = function (e) {
  var y = e.clientY - this.sizePickerCanvas.getBoundingClientRect().top;
  var size = (390-y) * 52 / 355;
  return Math.max(0.1, size);
};


module.exports = SizePicker;
