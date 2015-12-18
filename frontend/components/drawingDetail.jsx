var React = require('react');
var DrawingStore = require('../stores/drawingStore');
var ApiUtil = require('../util/apiUtil');
var History = require('react-router').History;

var DrawingDetail = React.createClass({
  mixins: [History],

  getInitialState: function() {
    return({
      drawing: null
    });
  },
  componentWillMount: function() {
    this.token = DrawingStore.addListener(this._onChange);
    ApiUtil.fetchDrawing(parseInt(this.props.params.drawingId));
  },
  componentWillUnmount: function() {
    this.token.remove();
  },
  _onChange: function() {
    this.setState({drawing: DrawingStore.single(this.props.params.drawingId)});
  },
  goToProfile: function() {
    this.history.push('/users/' + this.state.drawing.username);
  },
  render: function() {
    var contents = "";
    if (this.state.drawing){
      var url = "http://res.cloudinary.com/ddhru3qpb/image/upload/" + this.state.drawing.image_url + ".png";
      contents = (
        <div>
          <img src={url}/>
          <div
            className="username"
            onClick={this.goToProfile}>
            {this.state.drawing.username}
          </div>
        </div>
      );
    }
    return(
      <div>
        {contents}
      </div>
    );
  }

});

module.exports = DrawingDetail;
