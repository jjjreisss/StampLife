var React = require('react');

var Square = React.createClass({
  getInitialState: function() {
    return({
      background: this.props.background,
      drawing: true
    })
  },
  mouseOverHandler: function () {
    console.log("over");
    if (this.state.drawing){
      this.setState({background: "#000"});
    }
  },
  componentWillReceiveProps: function() {
    this.setState({drawing: this.props.drawing});
  },

  render: function() {
    return(
      <div className="square"
           style={{background: this.state.background}}
           onMouseOver={this.mouseOverHandler}>
      </div>
    )
  }
});

module.exports = Square;
