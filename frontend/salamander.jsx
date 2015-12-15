var React = require('react');
var ReactDOM = require('react-dom');

var Salamander = React.createClass({
  render: function() {
    return(
      <div>
        SALAMANDER
        <Canvas/>
      </div>
    );
  }
});

document.addEventListener("DOMContentLoaded", function () {
  ReactDOM.render(<Salamander/>, document.getElementById('root'));
});
