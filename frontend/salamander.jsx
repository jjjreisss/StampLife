var React = require('react');
var ReactDOM = require('react-dom');
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var App = require('./components/app');
var DrawingIndex = require('./components/drawingIndex');
var CanvasTest = require('./components/canvasTest');
var DrawingDetail = require('./components/drawingDetail');
var ProfilePage = require('./components/profilePage');
var StampIndex = require('./components/stampIndex');
var StampDetail = require('./components/stampDetail');
var NewStamp = require('./components/newStamp');
var Home = require('./components/home');
var IndexRoute = require('react-router').IndexRoute;


var routes = (
  <Route path="/" component={App}>
    <IndexRoute component={DrawingIndex}/>
    <Route path="/new" component={CanvasTest}/>
    <Route path="/stamps" component={StampIndex}/>
    <Route path="/drawings" component={DrawingIndex}/>
    <Route path="/drawings/:drawingId" component={DrawingDetail}/>
    <Route path="/users/:username" component={ProfilePage}/>
    <Route path="stamps/:stampId" component={StampDetail}/>
    <Route path="stamp/new" component={NewStamp}/>
  </Route>
);



document.addEventListener("DOMContentLoaded", function () {
  ReactDOM.render(<Router>{routes}</Router>, document.getElementById('root'));
});


// document.addEventListener("DOMContentLoaded", function () {
//   ReactDOM.render(<Canvas/>, document.getElementById('root'));
// });
