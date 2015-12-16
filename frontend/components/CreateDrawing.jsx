var React = require('react');

var CreateDrawing = React.createClass({
  getInitialState: function() {
    return({
      content: [],
      caption: "whatever dude",
      userId: 1
    })
  },
  componentDidMount: function() {
    DrawingStore.addListener(this.loadDrawing);
    ApiUtil.fetchNewDrawing();
  },
  loadDrawing: function() {
    var drawing = DrawingStore.all();
    var contentString = drawing.content;
    var contentArray = contentString.split(",");
    this.setCanvas(contentArray)
    this.setState({
      content: contentArray
    })
  }
})
