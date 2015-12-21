var React = require('react');
var StampIndex = require('./stampIndex');
var MyStampIndex = require('./myStampIndex');

var App = React.createClass({
  goToDrawingsIndex: function() {
    this.props.history.push('drawings');
  },
  goToNew: function() {
    this.props.history.push('new');
  },
  goToStampsIndex: function() {
    this.props.history.push('stamps');
  },

  render: function() {
    return(
      <div>
        <div onClick={this.goToDrawingsIndex}>
          All Drawings
        </div>
        <div onClick={this.goToNew}>
          New Drawing
        </div>
        <div onClick={this.goToStampsIndex}>
          All Stamps
        </div>
        <div>
          {this.props.children}
          <div
            className="stamp-sidebar">
            <MyStampIndex
              filterIndicies={[]}/>
          </div>
        </div>
      </div>
    )
  }
});

module.exports = App;
