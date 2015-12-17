var React = require('react');
var ApiUtil = require('../util/apiUtil');

var CanvasTest = React.createClass({
  getInitialState: function() {
    return({
      caption: "whatever dude",
      user_id: 1,
    });
  },
  componentDidMount: function() {
    this.canvas = document.getElementById('drawing');
    this.canvas.width = 500;
    this.canvas.height = 500;
    this.ctx = this.canvas.getContext('2d');
    this.prevX = 0;
    this.prevY = 0;
    this.currX = 0;
    this.currY = 0;
    this.drawing = false;
    this.rgbString = "black";

    this.setColorPicker();
    this.setSizePicker();
    this.setStrokeSample();
  },
  setSizePicker: function() {
    this.sizePickerCanvas = document.getElementById('size-picker');
    this.sizePickerContext = this.sizePickerCanvas.getContext('2d');
    var pickerImg = new Image();
    pickerImg.src = '../assets/triangle.png';
    pickerImg.onload = function() {
      this.sizePickerContext.drawImage(pickerImg, 0, 0);
    }.bind(this);
  },
  setColorPicker: function() {
    this.colorPickerCanvas = document.getElementById('color-picker');
    this.colorPickerContext = this.colorPickerCanvas.getContext('2d');
    var pickerImg = new Image();
    pickerImg.src = '../assets/color-picker-80-500.png';
    pickerImg.onload = function() {
      this.colorPickerContext.drawImage(pickerImg, 0, 0);
    }.bind(this);
  },
  setStrokeSample: function() {
    this.strokeSampleCanvas = document.getElementById('stroke-sample');
    this.strokeSampleContext = this.strokeSampleCanvas.getContext('2d');
  },
  pickSize: function(e) {
    var x = e.pageX - this.sizePickerCanvas.offsetLeft;
    this.ctx.lineWidth = (x-35) * 52 / 423;
    this.pickSample();
  },
  pickColor: function(e) {
    var x = e.pageX - this.colorPickerCanvas.offsetLeft;
    var y = e.pageY - this.colorPickerCanvas.offsetTop;
    var imgData = this.colorPickerContext.getImageData(x, y, 1, 1).data;
    var rgbArray = imgData.slice(0,3);
    this.rgbString = "rgb(" + rgbArray.join(",") + ")";
    this.pickSample();
  },
  pickSample: function() {
    this.strokeSampleContext.clearRect(0,0,80,80);
    var centerX = 40;
    var centerY = 40;
    var width = this.ctx.lineWidth;
    var left = centerX - width / 2;
    var top = centerY - width / 2;
    this.strokeSampleContext.fillStyle = this.rgbString;

    this.strokeSampleContext.fillRect(top, left, width, width);
  },
  mouseDownHandler: function(e) {
    console.log(this.ctx.lineWidth);
    this.drawing = true;
  },
  mouseUpHandler: function(e) {
    this.drawing = false;
  },
  mouseMoveHandler: function(e) {
    this.prevX = this.currX;
    this.prevY = this.currY;

    this.currX = (e.clientX - this.canvas.offsetLeft);
    this.currY = (e.clientY-this.canvas.offsetTop);

    if (this.drawing) {
      this.draw();
    }
  },
  mouseOutHandler: function(e) {
  },

  draw: function() {
    this.ctx.beginPath();
    this.ctx.moveTo(this.prevX, this.prevY);
    this.ctx.lineTo(this.currX, this.currY);

    this.ctx.strokeStyle = this.rgbString;
    this.ctx.stroke();
    this.ctx.closePath();
  },

  saveHandler: function() {
    var img = this.canvas.toDataURL("image/png");
    $.ajax({
      url: "api/images",
      method: "POST",
      data: {img: img},
      success: function(imageReceived) {
        ApiUtil.createDrawing({
          caption: this.state.caption,
          user_id: this.state.user_id,
          image_url: imageReceived.public_id
        });
        this.props.history.push('index');
      }.bind(this)
    });
  },

  render: function() {
    return(
      <div>
        <canvas id="drawing"
                onMouseDown={this.mouseDownHandler}
                onMouseUp={this.mouseUpHandler}
                onMouseMove={this.mouseMoveHandler}>

        </canvas>
        <canvas id="color-picker"
                width="80"
                height="500"
                onClick={this.pickColor}>

        </canvas>
        <canvas id="size-picker"
                width="500"
                height="80"
                onClick={this.pickSize}>

        </canvas>
        <canvas id="stroke-sample"
                width="80"
                height="80"
                >

        </canvas>
        <button onClick={this.saveHandler}>
          Save
        </button>
      </div>
          )
  }
});

module.exports = CanvasTest;


// cloudinary.config({
//   cloud_name: "ddhru3qpb",
//   api_key: 146894146738463,
//   api_secret: "5y7HbBXImnBzHQsL8SrkL72qW2Q"
// })
