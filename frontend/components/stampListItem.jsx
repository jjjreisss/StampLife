var React = require('react');
var History = require('react-router').History;

var StampListItem = React.createClass({
  mixins: [History],

  getInitialState: function() {
    return({

    });
  },
  setStamp() {
    ApiUtil.fetchSingleStamp(this.props.id);
  },
  render: function() {
    var url = "http://res.cloudinary.com/ddhru3qpb/image/upload/w_150,h_150/" + this.props.imageUrl + ".png";
    return (
      <div className="index-element">
        <img src={url}
          onClick={this.setStamp}/>
      </div>
    );
  }
});

module.exports = StampListItem;
