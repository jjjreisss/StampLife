var React = require('react');
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var ApiUtil = require('../util/apiUtil');
var DrawingStore = require('../stores/drawingStore');

var Canvas = React.createClass({
  mixins: [LinkedStateMixin],

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
  setCanvas: function(contentArray) {
    this.squares = [];

    contentArray.forEach(function(color, idx){
      var divStyle = {background: color}
      this.squares.push(
        <div key={idx}
             className="square"
             data-idx={idx}
             style={divStyle}
             onMouseOver={this.mouseOverHandler}
             onMouseDown={this.mouseDownHandler}
             onMouseUp={this.mouseUpHandler}>
        </div>
      )
    }.bind(this))
  },
  mouseOverHandler: function(e) {
    if (this.state.drawing) {
      this.addStroke(e)
    }
  },
  addStroke: function(e) {
    var idx = parseInt(e.target.attributes["data-idx"].value);
    this.state.content[idx] = "#000";
    console.log("Painting");
    this.squares[idx] = React.cloneElement(
      this.squares[idx],
      {style: {background: "#000"}}
    );
    this.forceUpdate();
  },
  mouseDownHandler: function(e){
    this.addStroke(e);
    this.setState({drawing: true})
  },
  mouseUpHandler: function(){
    this.setState({drawing: false})
  },
  saveHandler: function() {
    var content = String(this.state.content);
    var drawing = {
      content: content,
      caption: this.state.caption,
      user_id: this.state.userId
    }
    ApiUtil.createDrawing(drawing);
  },
  render: function() {

    return(
      <div className="canvas">
        {this.squares}
        <button onClick={this.saveHandler}>Save</button>
      </div>
    )

  }
});

module.exports = Canvas;
