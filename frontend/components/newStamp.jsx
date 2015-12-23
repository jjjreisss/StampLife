var React = require('react');
var ApiUtil = require('../util/apiUtil');
var DrawingCanvas = require('../util/drawingCanvas');
var StampCanvas = require('../util/stampCanvas');
var ColorPicker = require('../util/colorPicker');
var SizePicker = require('../util/sizePicker');
var StrokeSample = require('../util/strokeSample');
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var StampIndex = require('./stampIndex');
var StampStore = require('../stores/stampStore');

var CanvasTest = React.createClass({
  mixins: [LinkedStateMixin],

// Methods that set state
  getInitialState: function() {
    return({
      caption: "caption",
      stamping: false,
      recentColors: ["#fff","#fff","#fff","#fff","#fff",
                      "#fff","#fff","#fff","#fff","#fff",]
    });
  },
  componentDidMount: function() {
    this.drawingCanvas = new DrawingCanvas('drawing-canvas', 500, 500);
    this.sizePicker = new SizePicker('size-picker');
    this.colorPicker = new ColorPicker('color-picker');
    this.strokeSample = new StrokeSample('stroke-sample');

    this.size = 10;
    this.color = "#000";

    this.strokeSample.pickSample(this.color, this.size);

    this.colorPicking = false;
    this.sizePicking = false;
  },

  colorBar: function() {
    return this.state.recentColors.map(function(color, idx){
      return (
        <div
          key={idx}
          className="color-square"
          style={{background: color}}
          onClick={this.pickRecentColor}>

        </div>
      );
    }.bind(this));
  },
  saveStamp: function() {
    var img = this.drawingCanvas.toData();
    $.ajax({
      url: "api/images",
      method: "POST",
      data: {img: img},
      success: function(imageReceived) {
        ApiUtil.createStamp({
          name: "default name",
          image_url: imageReceived.public_id
        });
      }
    });
  },
  saveToMyStamps: function() {
    var img = this.drawingCanvas.toData();
    $.ajax({
      url: "api/images",
      method: "POST",
      data: {img: img},
      success: function(imageReceived) {
        ApiUtil.createMyStamp({
          name: "default name",
          image_url: imageReceived.public_id
        });
      }
    });
  },

// Methods for changing Color
  downColorPicker: function(e) {
    this.colorPicking = true;
    var color = this.colorPicker.pickColor(e);
    this.strokeSample.pickSample(color, this.size);
  },
  upColorPicker: function(e) {
    if (this.colorPicking) {
      this.pickColor();
    }
    this.colorPicking = false;
  },
  moveColorPicker: function(e) {
    if(this.colorPicking) {
      var color = this.colorPicker.pickColor(e);
      this.strokeSample.pickSample(color, this.size);
    }
  },
  outColorPicker: function(e) {
    if (this.colorPicking) {
      this.pickColor();
    }
    this.colorPicking = false;
  },
  pickColor: function(e) {
    if (this.colorPicking) {
      this.color = this.colorPicker.color();
      this.addRecentColor();
      this.drawingCanvas.setColor(this.color);
    }
  },
  pickRecentColor: function(e) {
    this.color = e.target.style.background;
    this.strokeSample.pickSample(this.color, this.size);
  },
  addRecentColor: function() {
    var recentColors = this.state.recentColors.slice(1,10);
    recentColors.push(this.color);
    this.setState({recentColors: recentColors});
  },

  // Methods for picking size
  onSizePicking: function(e) {
    this.sizePicking = true;
    this.pickSize(e);
  },
  offSizePicking: function() {
    this.sizePicking = false;
  },
  pickSize: function(e) {
    if (this.sizePicking) {
      this.size = this.sizePicker.pickSize(e);
      this.strokeSample.pickSample(this.color, this.size);
      this.drawingCanvas.setSize(this.size);
    }
  },

// Methods for drawing
  clearDrawingCanvas: function() {
    this.drawingCanvas.clearCanvas();
  },
  mouseDownHandler: function(e) {
    this.drawingCanvas.mouseDown(e, this.color, this.size);
  },
  mouseUpHandler: function(e) {
    this.drawingCanvas.mouseUp(e, this.color, this.size);
  },
  mouseOutHandler: function(e) {
    this.drawingCanvas.mouseOut(e, this.color, this.size);
  },
  mouseMoveHandler: function(e) {
    this.drawingCanvas.mouseMove(e, this.color, this.size);
  },
  onWheelHandler: function(e) {
    e.preventDefault();
    if (e.deltaY < 0) {
      this.size = this.size * 1.2;
      this.strokeSample.pickSample(this.color, this.size);
      this.drawingCanvas.setSize(this.size);
    } else {
      this.size = this.size / 1.2;
      this.strokeSample.pickSample(this.color, this.size);
      this.drawingCanvas.setSize(this.size);
    }
    this.drawingCanvas.mouseMove(e);
  },
  undo: function(e) {
    this.drawingCanvas.undo();
  },

  render: function() {
    return(
    <div>
      <div id="drawing-page">

        <div id="drawing">
          <canvas
            id="drawing-canvas"
            onMouseDown={this.mouseDownHandler}
            onMouseUp={this.mouseUpHandler}
            onMouseMove={this.mouseMoveHandler}
            onMouseOut={this.mouseOutHandler}
            onMouseOver={this.mouseOverHandler}
            onWheel={this.onWheelHandler}>

          </canvas>
          <canvas
            id="color-picker"
            width="80"
            height="500"
            onMouseDown={this.downColorPicker}
            onMouseUp={this.upColorPicker}
            onMouseMove={this.moveColorPicker}
            onMouseOut={this.outColorPicker}>

          </canvas>
          <canvas
            id="size-picker"
            width="500"
            height="80"
            onClick={this.pickSize}
            onMouseDown={this.onSizePicking}
            onMouseUp={this.offSizePicking}
            onMouseMove={this.pickSize}
            onMouseOut={this.offSizePicking}>

          </canvas>
          <canvas
            id="stroke-sample"
            width="80"
            height="80">

          </canvas>
          <div
            id="color-bar">
            {this.colorBar()}
          </div>
        </div>
      </div>

      <div className="drawing-toolbar">
        <button
          className="clear-drawing-canvas"
          onClick={this.clearDrawingCanvas}>
          Clear Canvas
        </button>

        <button
          className="save-to-my-stamps"
          onClick={this.saveToMyStamps}>
          Save To My Stamps
        </button>
        <button
          className="undo"
          onClick={this.undo}>
          Undo
        </button>
      </div>
    </div>
    );
  }
});

module.exports = CanvasTest;
