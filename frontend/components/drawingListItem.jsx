var React = require('react');
var History = require('react-router').History;

var DrawingListItem = React.createClass({
  mixins: [History],

  getInitialState: function() {
    return({

    });
  },
  goToShow: function() {
    this.history.push('drawings/' + this.props.drawingId);
  },
  render: function() {
    var url = "http://res.cloudinary.com/ddhru3qpb/image/upload/w_200,h_200/" + this.props.imageUrl + ".png";
    return (
      <div className="index-element">
        <img src={url}
          onClick={this.goToShow}/>
      </div>
    );
  }
});

module.exports = DrawingListItem;
