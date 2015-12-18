var React = require('react');
var DrawingStore = require('../stores/drawingStore');
var ApiUtil = require('../util/apiUtil');

var ProfilePage = React.createClass({
  getInitialState: function() {
    return({
      drawings: null
    });
  },
  componentDidMount: function() {
    this.token = DrawingStore.addListener(this._onChange);
    ApiUtil.fetchUserDrawings(this.props.params.userId);
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
    var drawingListItems = "";
    if(this.state.drawings) {
      drawingListItems = this.state.drawings.map(function(drawing, idx){
        var url = "http://res.cloudinary.com/ddhru3qpb/image/upload/w_150,h_150/" + drawing.image_url + ".png";
        return (
          <div key={idx}>
            <img src={url} />
          </div>
        );
      });
    }

    return (
      <div>
        {drawingListItems}
      </div>
    );
  }
});

module.exports = ProfilePage;
