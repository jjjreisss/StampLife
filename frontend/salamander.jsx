var React = require('react');
var ReactDOM = require('react-dom');
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var Canvas = require('./components/canvas');
var Index = require('./components/index');
var CreateDrawing = require('./components/createDrawing');
var EditDrawing = require('./components/editDrawing');
var DrawingIndex = require('./components/drawingIndex');
var CanvasTest = require('./components/canvasTest');


var routes = (
  <Route path="/" component={Index}>
    <Route path="/new" component={CreateDrawing}/>
    <Route path="/drawings/:drawingId" component={EditDrawing}/>
  </Route>
);



document.addEventListener("DOMContentLoaded", function () {
  ReactDOM.render(<CanvasTest/>, document.getElementById('root'));
});


// document.addEventListener("DOMContentLoaded", function () {
//   ReactDOM.render(<Canvas/>, document.getElementById('root'));
// });
