var React = require('react');
var DrawingStore = require('../stores/drawingStore');
var ApiUtil = require('../util/apiUtil');
var DrawingListItem = require('./drawingListItem');

var ProfilePage = React.createClass({
  getInitialState: function() {
    return({
      drawings: null
    });
  },
  componentDidMount: function() {
    this.token = DrawingStore.addListener(this._onChange);
    ApiUtil.fetchUserDrawings(this.props.params.username);
  },
  componentWillUnmount: function() {
    this.token.remove();
  },
  _onChange: function() {
    this.setState({
      drawings: DrawingStore.all()
    });
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
        <h2>{this.props.params.username + "'s Drawings"}</h2>
        {drawingsList}
      </div>
    );
  }
});

module.exports = ProfilePage;
