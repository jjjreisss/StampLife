var React = require('react');
var ApiUtil = require('../../util/apiUtil');
var ApiActions = require('../../actions/apiActions');
var DrawingCanvas = require('../../util/drawing/drawingCanvas');
var StampCanvas = require('../../util/drawing/stampCanvas');
var ColorPicker = require('../../util/drawing/colorPicker');
var SizePicker = require('../../util/drawing/sizePicker');
var StrokeSample = require('../../util/drawing/strokeSample');
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var StampIndex = require('../index/stampIndex');
var StampStore = require('../../stores/stampStore');
window.wholeDamnTour = require('../../util/wholeDamnTour');

var NewDrawing = React.createClass({
  mixins: [LinkedStateMixin],

// Methods that set state
  getInitialState: function() {
    return({
      caption: "caption",
      stamping: false,
      recentColors: ["#fff","#fff","#fff","#fff","#fff",
                      "#fff","#fff","#fff","#fff","#fff",],
      saveStarted: false,
      saved: false,
      stamp: null
    });
  },
  componentDidMount: function() {
    if (window.innerHeight > 799 && window.innerWidth > 999) {
      this.drawingCanvas = new DrawingCanvas('drawing-canvas', 500, 500);
      this.sizePicker = new SizePicker('size-picker', 80, 420);
      this.colorPicker = new ColorPicker('color-picker', 80, 500);
      this.strokeSample = new StrokeSample('stroke-sample', 80, 80);
      this.colorSquareSize = "50px";
    } else {
      this.drawingCanvas = new DrawingCanvas('drawing-canvas', 375, 375);
      this.sizePicker = new SizePicker('size-picker', 60, 315);
      this.colorPicker = new ColorPicker('color-picker', 60, 375);
      this.strokeSample = new StrokeSample('stroke-sample', 60, 60);
      this.colorSquareSize = "37.5px";
    }

    this.size = 30;
    this.color = "#000";
    this.drawingCanvas.setSize(this.size);
    this.drawingCanvas.setColor(this.color);

    this.strokeSample.pickSample(this.color, this.size);
    this.addRecentColor();

    this.colorPicking = false;
    this.sizePicking = false;

    this.stampStoreListener = StampStore.addListener(this.updateStamp);
  },

  componentWillUnmount: function() {
    this.stampStoreListener.remove();
  },

  updateStamp: function() {
    this.setState({
      stamp: StampStore.single()
    })
  },

  colorBar: function() {
    return this.state.recentColors.map(function(color, idx){
      var squareStyle = {
        background: color,
        width: this.colorSquareSize,
        height: this.colorSquareSize
      };
      return (
        <div
          key={idx}
          className="color-square"
          style={squareStyle}
          onClick={this.pickRecentColor}>

        </div>
      );
    }.bind(this)).reverse();
  },
  saveStamp: function() {
    var img = this.drawingCanvas.toData();
    this.setState({saveStarted: true});
    $.ajax({
      url: "api/images",
      method: "POST",
      data: {img: img},
      success: function(imageReceived) {
        ApiUtil.createStamp({
          name: "default name",
          image_url: imageReceived.public_id
        });
      this.setState({saved: true});
    }.bind(this),
      error: function() {
        this.setState({saveStarted: false});
      }.bind(this)
    });
  },
  saveToMyStamps: function() {
    var img = this.drawingCanvas.toData();

    if (!this.state.saved) {
      this.setState({saveStarted: true});
      $.ajax({
        url: "api/images",
        method: "POST",
        data: {img: img},
        success: function(imageReceived) {
          ApiUtil.createMyStamp({
            name: "default name",
            image_url: imageReceived.public_id
          });
          this.setState({saved: true});
        }.bind(this),
        error: function() {
          this.setState({saveStarted: false});
        }.bind(this)
      });
    } else {
      ApiActions.addToMyStamp(this.state.stamp)
    }
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
    this.drawingCanvas.setColor(this.color);
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
    this.drawingCanvas.hardReset();
    this.setState({
      saveStarted: false,
      saved: false
    })
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
  displayAttributes: function() {
    return ({
      saveText: this.state.saved ? "Saved" : text = "Save Stamp",
      saveToMyStampsText: this.state.saved ? "Add To My Stamps" : "Save To My Stamps",
      undoDisabled: this.state.saved ? true : false,
      saveDisabled: this.state.saveStarted ? true : false
    })
  },

  render: function() {
    return(
      <div className="drawing-page-with-header">
        <h1 className="drawing-header">
          <span className="drawing-header-text">
            <span>
              Make a Stamp
            </span>
          </span>
        </h1>
        <div id="entire-drawing-page">

          <span className="drawing-buttons"
            id="left-buttons">
            <button
              className="clear-drawing-canvas"
              onClick={this.clearDrawingCanvas}>
              Clear Canvas
            </button>
            <button
              className="undo"
              onClick={this.undo}
              disabled={this.displayAttributes().undoDisabled}>
              Undo
            </button>
          </span>

          <span id="drawing-page">

            <div id="drawing">
              <div id="main-square">
                <span className="left-side">
                  <canvas
                    id="size-picker"
                    onClick={this.pickSize}
                    onMouseDown={this.onSizePicking}
                    onMouseUp={this.offSizePicking}
                    onMouseMove={this.pickSize}
                    onMouseOut={this.offSizePicking}>

                  </canvas>
                  <canvas
                    id="stroke-sample">

                  </canvas>
                </span>
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
                  onMouseDown={this.downColorPicker}
                  onMouseUp={this.upColorPicker}
                  onMouseMove={this.moveColorPicker}
                  onMouseOut={this.outColorPicker}>

                </canvas>
              </div>
              <div
                id="color-bar">
                {this.colorBar()}
              </div>
            </div>
          </span>


          <span className="drawing-buttons"
            id="right-buttons">
            <button
              className="save-stamp"
              onClick={this.saveStamp}
              disabled={this.displayAttributes().saveDisabled}>
              {this.displayAttributes().saveText}
            </button>
            <button
              className="save-to-my-stamps"
              onClick={this.saveToMyStamps}>
              {this.displayAttributes().saveToMyStampsText}
            </button>
          </span>

        </div>
      </div>
    );
  }
});

module.exports = NewDrawing;
