var React = require('react');
var ApiUtil = require('../util/apiUtil');
var DrawingCanvas = require('../util/drawingCanvas');
var ColorPicker = require('../util/colorPicker');
var SizePicker = require('../util/sizePicker');
var StrokeSample = require('../util/strokeSample');

var CanvasTest = React.createClass({
  getInitialState: function() {
    return({
      caption: "whatever dude",
      user_id: 1,
    });
  },
  componentDidMount: function() {
    this.drawingCanvas = new DrawingCanvas('drawing-canvas');
    this.sizePicker = new SizePicker('size-picker');
    this.colorPicker = new ColorPicker('color-picker');
    this.strokeSample = new StrokeSample('stroke-sample');
  },
  pickSize: function(e) {
    this.size = this.sizePicker.pickSize(e);
    this.strokeSample.pickSample(this.color, this.size);
  },
  pickColor: function(e) {
    this.color = this.colorPicker.pickColor(e);
    this.strokeSample.pickSample(this.color, this.size);
  },
  mouseDownHandler: function(e) {
    this.drawingCanvas.mouseDown(e, this.color, this.size);
  },
  mouseUpHandler: function(e) {
    this.drawingCanvas.mouseUp(e);
  },
  mouseMoveHandler: function(e) {
    this.drawingCanvas.mouseMove(e);
  },
  mouseOutHandler: function(e) {
  },

  saveHandler: function() {
    var img = this.drawingCanvas.toData();
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
      <div id="drawing">
        <canvas id="drawing-canvas"
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
