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

  render: function() {
    return(
    <div id="entire-page">
      <div className="navbar navbar-inverse">
        <ul className="nav navbar-nav">
          <li role="presentation" className="dropdown">
            <a className="dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">
              <div className="ghost">Click Here</div> <span className="caret"></span>
            </a>
            <ul className="dropdown-menu">
              <li
                onClick={this.goToNewStamp}>
                Make Stamp
              </li>
              <li
                onClick={this.goToStampsIndex}>
                Get Stamps
              </li>
              <li
                onClick={this.goToNew}>
                New Drawing
              </li>
              <li
                onClick={this.goToDrawingsIndex}>
                All Drawings
              </li>
            </ul>
          </li>




        </ul>
            <button
              className="sign-out"
              onClick={this.signOut}>
              Sign Out
            </button>
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
