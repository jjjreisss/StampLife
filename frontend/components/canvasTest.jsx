var React = require('react');
var ApiUtil = require('../util/apiUtil');
var DrawingCanvas = require('../util/drawingCanvas');
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
                      "#fff","#fff","#fff","#fff","#fff",],
      stamp: null
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

    this.token = StampStore.addListener(this.selectStamp);
  },
  componentWillUnmount: function() {
    this.token.remove();
  },
  selectStamp: function() {
    this.setState({
      stamp: StampStore.single()
    })
    url = "http://res.cloudinary.com/ddhru3qpb/image/upload/" + this.state.stamp.image_url + ".png";
    this.stampCanvas.loadImage(url);
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
      )
    }.bind(this))
  },
  saveDrawing: function() {
    var img = this.drawingCanvas.toData();
    $.ajax({
      url: "api/images",
      method: "POST",
      data: {img: img},
      success: function(imageReceived) {
        ApiUtil.createDrawing({
          caption: this.state.caption,
          image_url: imageReceived.public_id
        });
        this.props.history.push('drawings');
      }.bind(this)
    });
  },
  saveStamp: function() {
    img = this.stampCanvas.toData();
    $.ajax({
      url: "api/images",
      method: "POST",
      data: {img: img},
      success: function(imageReceived) {
        ApiUtil.createStamp({
          name: "default name",
          image_url: imageReceived.public_id
        })
      }
    })
  },
  setStamp: function() {
    this.stampImg = this.stampCanvas.toData();
    this.drawingCanvas.setStamp(this.stampImg);
  },
  stampingText: function() {
    text = this.state.stamping ? "Turn Stamping Off" : "Turn Stamping On";
    return text;
  },
  toggleStamping: function() {
    this.drawingCanvas.toggleStamping();
    this.setState({stamping: !this.state.stamping})
    this.setStamp();
  },


// Methods for changing Color
  downColorPicker: function(e) {
    this.colorPicking = true;
    color = this.colorPicker.pickColor(e);
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
      color = this.colorPicker.pickColor(e);
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
    }
  },
  pickRecentColor: function(e) {
    this.color = e.target.style.background;
  },
  addRecentColor: function() {
    recentColors = this.state.recentColors.slice(1,10);
    recentColors.push(this.color);
    this.setState({recentColors: recentColors})
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
    }
  },

// Methods for drawing
  clearDrawingCanvas: function() {
    this.drawingCanvas.clear();
  },
  clearStamp: function() {
    this.stampCanvas.clear();
    this.setStamp();
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

  render: function() {
    return(
    <div>
      <div id="drawing-page">
        ATTN: Don't scroll down! Just zoom out your page instead.
        <div id="drawing">
          <canvas
            id="drawing-canvas"
            onMouseDown={this.mouseDownHandler}
            onMouseUp={this.mouseUpHandler}
            onMouseMove={this.mouseMoveHandler}
            onMouseOut={this.mouseUpHandler}>

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

        <div
          className="stamp-sidebar">
          <StampIndex/>
        </div>

        <div
          className="stamp-canvas">
          <canvas
            id="stamp-canvas"
            width="150"
            height="150"
            onMouseDown={this.mouseDownHandler}
            onMouseUp={this.mouseUpHandler}
            onMouseMove={this.mouseMoveHandler}>
          </canvas>
        </div>
      </div>
      <div className="drawing-toolbar">
        <div
          id="toggle-stamping"
          onMouseDown={this.toggleStamping}>
          {this.stampingText()}
        </div>
        <div
          id="undo"
          onClick={this.undo}>
          Undo
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
        <button
          className="save-drawing"
          onClick={this.saveDrawing}>
          Save Drawing
        </button>
        <button
          className="save-stamp"
          onClick={this.saveStamp}>
          Save Stamp
        </button>
      </div>
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
