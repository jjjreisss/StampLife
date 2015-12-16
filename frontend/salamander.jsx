var React = require('react');
var ReactDOM = require('react-dom');
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var Canvas = require('./components/canvas');


var routes = (
  <Route path="/drawings/:drawingId" component={Canvas}>

  </Route>
);



document.addEventListener("DOMContentLoaded", function () {
  ReactDOM.render(<Router>{routes}</Router>, document.getElementById('root'));
});


// document.addEventListener("DOMContentLoaded", function () {
//   ReactDOM.render(<Canvas/>, document.getElementById('root'));
// });
