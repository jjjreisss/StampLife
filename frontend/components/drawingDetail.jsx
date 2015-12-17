var React = require('react');
var DrawingStore = require('../stores/drawingStore');
var ApiUtil = require('../util/apiUtil');

var DrawingDetail = React.createClass({
  getInitialState: function() {
    return({
      drawing: DrawingStore.all()[0]
    })
  },
  componentWillMount: function() {
    this.token = DrawingStore.addListener(this._onChange);
    ApiUtil.fetchDrawing(parseInt(this.props.params.drawingId));
  },
  componentWillUnmount: function() {
    this.token.remove();
  },
  _onChange: function() {
    this.setState({drawing: DrawingStore.all()[0]})
  },
  render: function() {
    var contents = "";
    if (this.state.drawing){
      var url = "http://res.cloudinary.com/ddhru3qpb/image/upload/" + this.state.drawing.image_url + ".png"
      contents = (
        <img src={url}/>
      )
    }
    return(
      <div>
        {contents}
      </div>
    )
  }

});

module.exports = DrawingDetail;
