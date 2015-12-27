var React = require('react');
var DrawingStore = require('../stores/drawingStore');
var ApiUtil = require('../util/apiUtil');
var DrawingListItem = require('./drawingListItem');

var DrawingIndex = React.createClass({
  getInitialState: function() {
    return({
      drawings: null
    });
  },
  componentDidMount: function() {
    this.listener = DrawingStore.addListener(this._onChange);
    ApiUtil.fetchAllDrawings();
  },
  componentWillUnmount: function() {
    this.listener.remove();
  },
  _onChange: function() {
    this.setState({drawings: DrawingStore.all().reverse()});
  },

  render: function() {
    var drawingsList = "";
    if (this.state.drawings) {
      drawingsList = this.state.drawings.map(function(drawing, idx){
        return (
          <DrawingListItem
            key={idx}
            drawingId={drawing.id}
            imageUrl={drawing.image_url}/>
        );
      });
    }
    return(
      <div className="index">
        {drawingsList}
      </div>
    );
  }

});

module.exports = DrawingIndex;


// function draw() {
//     	// Erasing line
//     	var canvas = document.getElementById("eraseLine");
//     	if (canvas.getContext) {
//         	var ctx = canvas.getContext("2d");
//
//         	// Black background square
//         	ctx.fillRect(0, 0, 200, 200);
//
//         	// Erasing curved line
//         	ctx.globalCompositeOperation = "destination-out";
//
//         	ctx.beginPath();
//         	ctx.moveTo(160, 40);
//         	ctx.bezierCurveTo(90, 10, 60, 20, 10, 90);
//
//         	ctx.lineWidth = 7;
//         	ctx.stroke();
//     	}
// }
