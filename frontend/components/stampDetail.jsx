var React = require('react');
var StampStore = require('../stores/stampStore');
var ApiUtil = require('../util/apiUtil');
var History = require('react-router').History;

var StampDetail = React.createClass({
  mixins: [History],

  getInitialState: function() {
    return({
      stamp: null
    });
  },
  componentWillMount: function() {
    this.token = StampStore.addListener(this._onChange);
    ApiUtil.fetchStamp(parseInt(this.props.params.stampId));
  },
  componentWillUnmount: function() {
    this.token.remove();
  },
  _onChange: function() {
    this.setState({stamp: StampStore.single(this.props.params.stampId)});
  },
  goToProfile: function() {
    this.history.push('/users/' + this.state.stamp.username);
  },
  render: function() {
    var contents = "";
    if (this.state.stamp){
      var url = "http://res.cloudinary.com/ddhru3qpb/image/upload/" + this.state.stamp.image_url + ".png";
      contents = (
        <div>
          <img src={url}/>
          <div
            className="username"
            onClick={this.goToProfile}>
            {this.state.stamp.username}
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

module.exports = StampDetail;
