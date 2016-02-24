var React = require('react');
var StampIndex = require('./index/stampIndex');
var MyStampIndex = require('./index/myStampIndex');
var History = require('react-router').History;

var App = React.createClass({
  mixins: [History],

  componentDidMount: function() {
  },
  goToDrawingsIndex: function() {
    this.props.history.push('drawings');
  },
  goToNew: function() {
    this.props.history.push('new');
  },
  goToStampsIndex: function() {
    this.props.history.push('stamps');
  },
  goToNewStamp: function() {
    this.props.history.push('stamp/new');
  },
  goToMyProfile: function() {

  },
  signOut: function() {
    $.ajax({
      url: '/session',
      method: 'DELETE',
      success: function(message) {
        console.log(message);
        window.location.href = '/';
      },
      error: function(message) {
      }
    });
  },
  startTour: function() {
    $.ajax({
      url: "users/1",
      method: "PUT",
      data: {
        user: {
          tour_one_completed: false,
        }
      },
      success: function() {
        if (this.props.routes[1].path === 'new') {
          wholeDamnTour.start();
        } else {
          this.history.push('new');
        }
      }.bind(this)
    });
  },

  render: function() {
    return(
    <div id="entire-page">
      <div className="navbar navbar-inverse">
        <ul className="nav navbar-nav">
          <li role="presentation" className="dropdown">
            <a className="dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">
              <div className="ghost">Menu</div> <span className="caret"></span>
            </a>
            <ul className="dropdown-menu">
              <li
                className="make-stamp"
                onClick={this.goToNewStamp}>
                Make Stamp
              </li>
              <li
                className="get-stamps"
                onClick={this.goToStampsIndex}>
                Get Stamps
              </li>
              <li
                className="new-drawing"
                onClick={this.goToNew}>
                New Drawing
              </li>
              <li
                className="all-drawings"
                onClick={this.goToDrawingsIndex}>
                All Drawings
              </li>
            </ul>
          </li>




        </ul>
          <div
            className="navbar-right">
            <button
              className="start-tour"
              onClick={this.startTour}>
              Start Tour
            </button>
            <button
              className="sign-out"
              onClick={this.signOut}>
              Sign Out
            </button>
          </div>
      </div>



      <div id="page-content">
        <div id="page-content-inner">
          {this.props.children}
          <div
            className="stamp-sidebar">
            <MyStampIndex
              filterIndicies={[]}/>
          </div>
        </div>
      </div>
    </div>
  );
  }
});

module.exports = App;
