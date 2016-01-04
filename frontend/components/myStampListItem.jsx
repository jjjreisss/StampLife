var React = require('react');
var History = require('react-router').History;
var ApiUtil = require('../util/apiUtil');
var ApiActions = require('../actions/apiActions');
var StampStore = require('../stores/stampStore');

var MyStampListItem = React.createClass({
  mixins: [History],

  getInitialState: function() {
    return({
      stamp: null,
      imageLoaded: false
    });
  },
  setStamp: function() {
    ApiUtil.setStamp(this.props.stampId);
  },
  deleteMyStamp: function() {
    ApiActions.deleteMyStamp(this.props.stampId);
  },
  selectedText: function() {
    var text;
    if (StampStore.single()) {
      StampStore.single().id === this.props.stampId ? text = "selected" : text = "";
    }
    return text;
  },
  addDeleteIcon: function() {
    this.setState({imageLoaded: true});
  },
  deleteIcon: function () {
    var text;
    if (this.state.imageLoaded) {
      text = (
        <div
          className="delete-my-stamp-icon"
          onClick={this.deleteMyStamp}>
        </div>
      );
    } else {
      text = "";
    }
    return text;
  },
  render: function() {
    var size = this.props.size;
    var sizeString = "w_"+size+",h_"+size+"/";
    var url = "http://res.cloudinary.com/ddhru3qpb/image/upload/" + sizeString + this.props.imageUrl + ".png";

    return (
      <div className="my-stamp-index-element"
        id={this.selectedText()}>
        <img
          className="my-stamp-index-image"
          src={url}
          onClick={this.setStamp}
          onLoad={this.addDeleteIcon}/>
        {this.deleteIcon()}

      </div>
    );
  }
});

module.exports = MyStampListItem;
