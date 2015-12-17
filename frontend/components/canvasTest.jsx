var React = require('react');
var ApiUtil = require('../util/apiUtil');

var CanvasTest = React.createClass({
  getInitialState: function() {
    return({
      caption: "whatever dude",
      user_id: 1,
    })
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
  },
  setColorPicker: function() {
    this.pickerCanvas = document.getElementById('color-picker');
    this.pickerContext = this.pickerCanvas.getContext('2d');
    var pickerImg = new Image();
    pickerImg.src = '../assets/color-picker.png';
    pickerImg.onload = function() {
      this.pickerContext.drawImage(pickerImg, 0, 0);
    }.bind(this);
  },
  pickColor: function(e) {
    var x = e.pageX - this.pickerCanvas.offsetLeft;
    var y = e.pageY - this.pickerCanvas.offsetTop;
    var imgData = this.pickerContext.getImageData(x, y, 1, 1).data;
    var rgbArray = imgData.slice(0,3);
    this.rgbString = "rgb(" + rgbArray.join(",") + ")";
  },
  mouseDownHandler: function(e) {
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
    this.ctx.lineWidth = 5;
    this.ctx.stroke();
    this.ctx.closePath();
  },

  saveHandler: function() {
    var img = this.canvas.toDataURL("image/png");
    $.ajax({
      url: "api/images",
      method: "POST",
      data: {img: img},
      success: function(image_received) {
        console.log(image_received)
        ApiUtil.createDrawing({
          caption: this.state.caption,
          user_id: this.state.user_id,
          image_url: image_received.public_id
        })
        this.props.history.push('index')
      }.bind(this)
    })
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
                width="270"
                height="270"
                onClick={this.pickColor}>

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
