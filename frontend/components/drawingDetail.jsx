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
  goBack: function() {
    this.history.goBack();
  },
  render: function() {
    var contents = "";
    var profileUrl;
    if (this.state.drawing) {
      profileUrl = '#/users/' + this.state.drawing.username;
    }
    if (this.state.drawing){
      var url = "http://res.cloudinary.com/ddhru3qpb/image/upload/w_500,h_500/" + this.state.drawing.image_url + ".png";
      contents = (
        <div>
          <div
            className="index-element">
            <img src={url}
            onClick={this.goBack}/>
          </div>
          <div>
            Drawn by <a href={profileUrl}>{this.state.drawing.username}</a>
            <br/>
            {this.state.drawing.time_ago + " ago"}
          </div>
        </div>
      );
    }
    return(
      <div className="drawing-detail">
        {contents}
      </div>
    );
  }

});

module.exports = DrawingDetail;
