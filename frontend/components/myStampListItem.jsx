var React = require('react');
var History = require('react-router').History;
var ApiUtil = require('../util/apiUtil');
var ApiActions = require('../actions/apiActions');

var MyStampListItem = React.createClass({
  mixins: [History],

  getInitialState: function() {
    return({

    });
  },
  setStamp: function() {
    ApiUtil.setStamp(this.props.stampId);
  },
  deleteMyStamp: function() {
    ApiActions.deleteMyStamp(this.props.stampId);
  },
  render: function() {
    var size = this.props.size;
    var sizeString = "w_"+size+",h_"+size+"/";
    var url = "http://res.cloudinary.com/ddhru3qpb/image/upload/" + sizeString + this.props.imageUrl + ".png";

    return (
      <div className="my-stamp-index-element">
        <img src={url}
          onClick={this.setStamp}/>
        <div
          className="delete-my-stamp-icon"
          onClick={this.deleteMyStamp}>
        </div>

      </div>
    );
  }
});

module.exports = MyStampListItem;
