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
  deleteDrawing: function() {
    $.ajax({
      url: "api/drawings/" + this.props.drawingId,
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
    var url = "http://res.cloudinary.com/ddhru3qpb/image/upload/w_500,h_500/" + this.props.imageUrl + ".png";
    return (
      <div className="index-element">
        <img src={url}
          onClick={this.goToShow}/>
        <div className="delete"
          onClick={this.deleteDrawing}>
          Delete
        </div>
      </div>
    );
  }
});

module.exports = DrawingListItem;
