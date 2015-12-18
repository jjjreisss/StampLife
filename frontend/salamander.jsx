var React = require('react');
var ReactDOM = require('react-dom');
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var App = require('./components/app');
var DrawingIndex = require('./components/drawingIndex');
var CanvasTest = require('./components/canvasTest');
var DrawingDetail = require('./components/drawingDetail');
var ProfilePage = require('./components/profilePage');


var routes = (
  <Route path="/" component={App}>
    <Route path="/new" component={CanvasTest}/>
    <Route path="/index" component={DrawingIndex}/>
    <Route path="/drawing/:drawingId" component={DrawingDetail}/>
    <Route path="users/:userId" component={ProfilePage}/>
  </Route>
);



document.addEventListener("DOMContentLoaded", function () {
  ReactDOM.render(<Router>{routes}</Router>, document.getElementById('root'));
});


// document.addEventListener("DOMContentLoaded", function () {
//   ReactDOM.render(<Canvas/>, document.getElementById('root'));
// });
