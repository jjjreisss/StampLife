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
    e.target.className = "drawn";
  },
  render: function() {
    return(
      <div className="canvas">
        {this.state.squares}
      </div>
    )

  }
});

module.exports = Canvas;
