var React = require('react');

var Index = React.createClass({
  render: function() {
    return(
      <div>
        Index
        {this.props.children}
      </div>
    )
  }
});

module.exports = Index;
