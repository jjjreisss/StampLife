var React = require('react');
var ApiUtil = require('../util/apiUtil');
var DrawingCanvas = require('../util/drawingCanvas');
var ColorPicker = require('../util/colorPicker');
var SizePicker = require('../util/sizePicker');
var StrokeSample = require('../util/strokeSample');
var LinkedStateMixin = require('react-addons-linked-state-mixin');

var CanvasTest = React.createClass({
  mixins: [LinkedStateMixin],

  getInitialState: function() {
    return({
      caption: "caption",
    });
  },
  componentDidMount: function() {
    this.drawingCanvas = new DrawingCanvas('drawing-canvas', 500, 500);
    this.sizePicker = new SizePicker('size-picker');
    this.colorPicker = new ColorPicker('color-picker');
    this.strokeSample = new StrokeSample('stroke-sample');
    this.stampCanvas = new DrawingCanvas('stamp-canvas', 150, 150);

    this.colorPicking = false;
    this.sizePicking = false;
  },
  pickSize: function(e) {
    if (this.sizePicking) {
      this.size = this.sizePicker.pickSize(e);
      this.strokeSample.pickSample(this.color, this.size);
    }
  },
  pickColor: function(e) {
    if (this.colorPicking) {
      this.color = this.colorPicker.pickColor(e);
      this.strokeSample.pickSample(this.color, this.size);
    }
  },
  onColorPicking: function(e) {
    this.colorPicking = true;
    this.pickColor(e);
  },
  offColorPicking: function() {
    this.colorPicking = false;
  },
  onSizePicking: function(e) {
    console.log('hi');
    this.sizePicking = true;
    this.pickSize(e);
  },
  offSizePicking: function() {
    this.sizePicking = false;
  },
  mouseDownHandler: function(e) {
    if (e.target.id === "drawing-canvas"){
        this.drawingCanvas.mouseDown(e, this.color, this.size);
    } else if (e.target.id === "stamp-canvas"){
      this.stampCanvas.mouseDown(e, this.color, this.size);
    }
  },
  mouseUpHandler: function(e) {
    if (e.target.id === "drawing-canvas"){
      this.drawingCanvas.mouseUp(e, this.color, this.size);
    } else if (e.target.id === "stamp-canvas"){
      this.stampCanvas.mouseUp(e, this.color, this.size);
      this.setStamp();
    }
  },
  mouseMoveHandler: function(e) {
    if (e.target.id === "drawing-canvas"){
        this.drawingCanvas.mouseMove(e, this.color, this.size);
    } else if (e.target.id === "stamp-canvas"){
      this.stampCanvas.mouseMove(e, this.color, this.size);
    }
  },
  mouseOutHandler: function(e) {
  },
  toggleStamping: function() {
    this.drawingCanvas.toggleStamping();
    this.setStamp();
  },
  setStamp: function() {
    this.stampImg = this.stampCanvas.toData();
    this.drawingCanvas.setStamp(this.stampImg);
  },
  clearDrawingCanvas: function() {
    this.drawingCanvas.clear();
  },
  clearStamp: function() {
    this.stampCanvas.clear();
    this.setStamp();
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
                onMouseMove={this.mouseMoveHandler}
                onMouseOut={this.mouseUpHandler}>

        </canvas>
        <canvas id="color-picker"
                width="80"
                height="500"
                onMouseDown={this.onColorPicking}
                onMouseUp={this.offColorPicking}
                onMouseMove={this.pickColor}
                onMouseOut={this.offColorPicking}>

        </canvas>
        <canvas id="size-picker"
                width="500"
                height="80"
                onClick={this.pickSize}
                onMouseDown={this.onSizePicking}
                onMouseUp={this.offSizePicking}
                onMouseMove={this.pickSize}
                onMouseOut={this.offSizePicking}>

        </canvas>
        <canvas id="stroke-sample"
                width="80"
                height="80"
                >

        </canvas>
        <canvas id="stamp-canvas"
                width="150"
                height="150"
                onMouseDown={this.mouseDownHandler}
                onMouseUp={this.mouseUpHandler}
                onMouseMove={this.mouseMoveHandler}>
        </canvas>
        <div id="toggle-stamping"
             onMouseDown={this.toggleStamping}>
          Toggle Stamping
        </div>
        <div id="drawing-form">
          <input type="text" valueLink={this.linkState('caption')}/>
        </div>
        <button
          className="clear-drawing-canvas"
          onClick={this.clearDrawingCanvas}>
          Clear Canvas
        </button>
        <button
          className="clear-button"
          onClick={this.clearStamp}>
          Clear Stamp
        </button>
        <button onClick={this.saveHandler}>
          Save
        </button>
      </div>
    );
  }
});

module.exports = CanvasTest;


// cloudinary.config({
//   cloud_name: "ddhru3qpb",
//   api_key: 146894146738463,
//   api_secret: "5y7HbBXImnBzHQsL8SrkL72qW2Q"
// })
