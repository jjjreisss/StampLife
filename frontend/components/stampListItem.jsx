var React = require('react');
var History = require('react-router').History;
var ApiUtil = require('../util/apiUtil');
var ApiActions = require('../actions/apiActions');

var StampListItem = React.createClass({
  mixins: [History],

  getInitialState: function() {
    return({
      text: false
    });
  },
  setStamp: function() {
    ApiUtil.addToMyStamp(this.props.stampId);
  },
  displayText: function() {
    this.setState({text: true});
  },
  hideText: function() {
    this.setState({text: false});
  },
  deleteStamp: function() {
    $.ajax({
      url: "api/stamps/" + this.props.stampId,
      method: "DELETE",
      success: function(message) {
        console.log(message.message);
        console.log("delete successful");
      },
      error: function(message) {
        console.log(message.message);
      }
    });
  },
  render: function() {
    var size = 250;
    var sizeString = "w_"+size+",h_"+size+"/";
    var url = "http://res.cloudinary.com/ddhru3qpb/image/upload/" + sizeString + this.props.imageUrl + ".png";
    var selectStampText = (this.state.text ? "select-stamp-icon" : "hidden");
    return (
      <div
        className="index-element"
        onClick={this.setStamp}
        onMouseEnter={this.displayText}
        onMouseLeave={this.hideText}>
        <img src={url}/>
        <div
          className={selectStampText}>
        </div>
        <div
          onClick={this.deleteStamp}>
          Delete
        </div>
      </div>
    );
  }
});

module.exports = StampListItem;
