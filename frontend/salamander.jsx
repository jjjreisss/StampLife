var React = require('react');
var ReactDOM = require('react-dom');
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var App = require('./components/app');
var DrawingIndex = require('./components/index/drawingIndex');
var NewDrawing = require('./components/new/newDrawing');
var DrawingDetail = require('./components/show/drawingDetail');
var ProfilePage = require('./components/show/profilePage');
var StampIndex = require('./components/index/stampIndex');
var StampDetail = require('./components/show/stampDetail');
var NewStamp = require('./components/new/newStamp');
var IndexRoute = require('react-router').IndexRoute;
var Shepherd = require('tether-shepherd');


var routes = (
  <Route path="/" component={App}>
    <IndexRoute component={NewDrawing}/>
    <Route path="/new" component={NewDrawing}/>
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
