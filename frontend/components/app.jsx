var React = require('react');

var App = React.createClass({
  goToIndex: function() {
    this.props.history.push('index');
  },
  goToNew: function() {
    this.props.history.push('new');
  },

  render: function() {
    return(
      <div>
        <div onClick={this.goToIndex}>
          All Drawings
        </div>
        <div onClick={this.goToNew}>
          New Drawing
        </div>
        {this.props.children}
      </div>
    )
  }
});

module.exports = App;
