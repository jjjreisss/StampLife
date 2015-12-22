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
  render: function() {
    var size = this.props.size;
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
        <img
          src="./plussign5.png"
          className={selectStampText}/>
      </div>
    );
  }
});

module.exports = StampListItem;
