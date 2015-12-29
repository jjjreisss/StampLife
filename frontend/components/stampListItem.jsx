var React = require('react');
var History = require('react-router').History;
var ApiUtil = require('../util/apiUtil');
var ApiActions = require('../actions/apiActions');
var StampStore = require('../stores/stampStore');

var StampListItem = React.createClass({
  mixins: [History],

  getInitialState: function() {
    return({
      hover: false,
      usesClicked: false
    });
  },
  setStamp: function() {
    ApiUtil.addToMyStamp(this.props.stampId);
  },
  displayText: function() {
    this.setState({hover: true});
  },
  hideText: function() {
    this.setState({hover: false});
  },
  toggleList: function(e) {
    e.preventDefault();
    this.setState({usesClicked: !this.state.usesClicked});
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
    var url = "http://res.cloudinary.com/ddhru3qpb/image/upload/w_250,h_250/" + this.props.imageUrl + ".png";
    var selectStampText = (this.state.hover ? "select-stamp-icon" : "hidden");
    var stampUseCount = (this.state.hover ? "stamp-use-count" : "hidden");
    var stampUseList = (this.state.usesClicked ? "stamp-use-list" : "hidden");
    return (
      <div
        className="index-element"
        onMouseEnter={this.displayText}
        onMouseLeave={this.hideText}>
        <img src={url}/>
        <div
          className={stampUseCount}
          onClick={this.toggleList}>
          Used {this.props.stamp.stamp_uses.length} Times
          <div
            className={stampUseList}>
            {this.props.stamp.stamp_uses.map(function(use, i) {
              return <div key={i}>{use}</div>;
            })}
          </div>
        </div>
        <div
          className={selectStampText}
          onClick={this.setStamp}>
        </div>
        <div className="delete"
          onClick={this.deleteStamp}>
          Delete
        </div>
        <div className="stamp-author">
          {this.props.stamp.author}
        </div>
      </div>
    );
  }
});

module.exports = StampListItem;
