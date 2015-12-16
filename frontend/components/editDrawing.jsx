var React = require('react');
var Canvas = require('./canvas');
var ApiUtil = require('../util/apiUtil');

var EditDrawing = React.createClass({
  getInitialState: function() {
    return({
      content: [],
      caption: "whatever dude",
      userId: 1
    })
  },
  componentDidMount: function() {
    ApiUtil.fetchDrawing(this.props.params.drawingId);
  },

  render: function() {
    return(
      <div>
        <Canvas />
      </div>
    );
  }
});

module.exports = EditDrawing;
