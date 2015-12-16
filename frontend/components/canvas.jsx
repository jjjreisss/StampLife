var React = require('react');
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var ApiUtil = require('../util/apiUtil');
var DrawingStore = require('../stores/drawingStore');
var Square = require('./square');

var Canvas = React.createClass({
  mixins: [LinkedStateMixin],

  getInitialState: function() {
    return({
      content: [],
      caption: "whatever dude",
      userId: 1,
      drawing: false
    })
  },
  componentWillMount: function() {
    // this._buildCanvas();
  },
  componentDidMount: function() {
    DrawingStore.addListener(this.loadDrawing);
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

    contentArray.forEach(function(background, idx){
      this.squares.push(
        <Square background={background}
                drawing={false}
                key={idx}
                data-idx={idx} />
      )
    }.bind(this))
  },
  mouseDownHandler: function(e){
    this.setState({drawing: true})
    for (var i = 0; i < this.squares.length; i++) {
      this.squares[i] = React.cloneElement(
        this.squares[i],
        {drawing: true}
      )
    }
    console.log("down");
    console.log(this.squares[0])
  },
  mouseUpHandler: function(){
    this.setState({drawing: false})
    for (var i = 0; i < this.squares.length; i++) {
      this.squares[i] = React.cloneElement(
        this.squares[i],
        {drawing: false}
      )
    }
    console.log("up");
    console.log(this.squares[0]);

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
      <div className="canvas"
           onMouseDown={this.mouseDownHandler}
           onMouseUp={this.mouseUpHandler}>
        {this.squares}
        <button onClick={this.saveHandler}>Save</button>
      </div>
    )

  }
});

module.exports = Canvas;
