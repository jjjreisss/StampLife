var React = require('react');
var DrawingStore = require('../stores/drawingStore');
var ApiUtil = require('../util/apiUtil');
var DrawingListItem = require('./drawingListItem');

var DrawingIndex = React.createClass({
  getInitialState: function() {
    return({
      drawings: DrawingStore.all()
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
    this.setState({drawings: DrawingStore.all()});
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
      <div className="drawings-index">
        {drawingsList}
      </div>
    );
  }

});

module.exports = DrawingIndex;
