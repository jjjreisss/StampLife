var React = require('react');
var Canvas = require('./canvas');
var ApiUtil = require('../util/apiUtil');

var CreateDrawing = React.createClass({
  getInitialState: function() {
    return({
      content: [],
      caption: "whatever dude",
      userId: 1
    })
  },
  componentDidMount: function() {
    ApiUtil.fetchNewDrawing();
  },
  render: function() {
    return(
      <div>
        <Canvas/>
      </div>
    )
  }
})

module.exports = CreateDrawing;
