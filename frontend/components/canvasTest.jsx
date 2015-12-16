var React = require('react');

var CanvasTest = React.createClass({
  getInitialState: function() {
    return({

    })
  },
  componentDidMount: function() {
    canvas = document.getElementById('drawing');
    canvas.width = 500;
    canvas.height = 500;
    this.ctx = canvas.getContext('2d');
    this.prevX = 0;
    this.prevY = 0;
    this.currX = 0;
    this.currY = 0;
    this.drawing = false;
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

    this.currX = (e.clientX - canvas.offsetLeft);
    this.currY = (e.clientY-canvas.offsetTop);

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
    console.log('prev');
    console.log([this.prevX, this.prevY])
    console.log('curr')
    console.log([this.currX, this.currY]);
    this.ctx.strokeStyle = "black";
    this.ctx.lineWidth = 5;
    this.ctx.stroke();
    this.ctx.closePath();
  },

  render: function() {
    return(
      <div>
        Outside Canvas
        <canvas id="drawing"
                onMouseDown={this.mouseDownHandler}
                onMouseUp={this.mouseUpHandler}
                onMouseMove={this.mouseMoveHandler}>

        </canvas>
      </div>
          )
  }
});

module.exports = CanvasTest;
