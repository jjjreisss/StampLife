var React = require('react');
var DrawingStore = require('../stores/drawingStore');
var ApiUtil = require('../util/apiUtil');
var DrawingListItem = require('./drawingListItem');
var StampStore = require('../stores/stampStore');
var StampListItem = require('./stampListItem');

var ProfilePage = React.createClass({
  getInitialState: function() {
    return({
      drawings: null,
      stamps: null
    });
  },
  componentDidMount: function() {
    this.drawingToken = DrawingStore.addListener(this._drawingsChanged);
    this.stampToken = StampStore.addListener(this._stampsChanged);
    ApiUtil.fetchUserDrawings(this.props.params.username);
    ApiUtil.fetchUserStamps(this.props.params.username);
  },
  componentWillUnmount: function() {
    this.drawingToken.remove();
    this.stampToken.remove();
  },
  _drawingsChanged: function() {
    this.setState({
      drawings: DrawingStore.all().reverse()
    });
  },
  _stampsChanged: function() {
    this.setState({
      stamps: StampStore.all().reverse()
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
    var stampsList = "";
    if (this.state.stamps) {
      stampsList = this.state.stamps.map(function(stamp, idx){
        return (
          <StampListItem
            key={idx}
            stampId={stamp.id}
            imageUrl={stamp.image_url}
            size={100}
            stamp={stamp}/>
        );
      });
    }
    return(
      <div>
        <div className="index">
          <h2 className="index-header">
            <span
              className="index-tab"
              id="selected-tab">
              {this.props.params.username + "'s Drawings"}
            </span>
          </h2>
          <div className="index-contents">
            {drawingsList}
          </div>
        </div>
        <div className="index">
          <h2 className="index-header">
            <span
              className="index-tab"
              id="selected-tab">
              {this.props.params.username + "'s Stamps"}
            </span>
          </h2>
          <div className="index-contents">
            {stampsList}
          </div>
        </div>
      </div>
    );
  }
});

module.exports = ProfilePage;
