var React = require('react');

var Canvas = React.createClass({
  getInitialState: function() {
    return({
      squares: []
    })
  },
  componentWillMount: function() {
    this._buildCanvas();
  },
  _buildCanvas: function() {
    i = 0;
    while (this.state.squares.length < 10000){
      this.state.squares.push(
        <div key={i}
             className="square"
             onMouseOver={this.mouseOverHandler}>

        </div>
      );
      i += 1;
    }
  },
  mouseOverHandler: function(e) {
    if (this.state.drawing) {
      e.target.className = "drawn";
    }
  },
  mouseDownHandler: function(){
    this.setState({drawing: true})
  },
  mouseUpHandler: function(){
    this.setState({drawing: false})
  },
  render: function() {
    return(
      <div className="canvas"
           onMouseDown={this.mouseDownHandler}
           onMouseUp={this.mouseUpHandler}>
        {this.state.squares}
      </div>
    )

  }
});

module.exports = Canvas;
