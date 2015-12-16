var React = require('react');

var EditDrawing = React.createClass({
  getInitialState: function() {
    return({
      content: [],
      caption: "whatever dude",
      userId: 1
    })
  },
  componentWillMount: function() {
    // this._buildCanvas();
  },
  componentDidMount: function() {
    DrawingStore.addListener(this.loadDrawing);
    ApiUtil.fetchDrawing(this.props.params.drawingId);
  },
  loadDrawing: function() {
    var drawing = DrawingStore.all();
    var contentString = drawing.content;
    var contentArray = contentString.split(",");
    this.setCanvas(contentArray)
    this.setState({
      content: contentArray
    })
  },

  render: function() {
    return(
      <div>
        <Canvas drawingId={this.props.params.drawingId}
                content={this.state.content}/>
      </div>
    )
  }
});
