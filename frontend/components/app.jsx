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

  render: function() {
    return(
    <div>
      <div className="navbar navbar-inverse">
        <ul className="nav navbar-nav">
          <li role="presentation" className="dropdown">
            <a className="dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">
              <div className="ghost">👻</div> <span className="caret"></span>
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

          <li>
            <ul>
              <li className="instructions">
                Step 1. Make a Stamp (or two)
              </li >
              <li className="instructions">
                Step 2. Go 'Shopping' for Stamps
              </li >
              <li className="instructions">
                Step 3. Make a Drawing with Your Stamps
              </li >
            </ul>
          </li>

          <li>
            <ul className="instructions">
              <li className="instructions">
                Tip: Use Mousewheel to Resize
              </li >
              <li className="instructions">
                Tip: Click + Drag on Size + Color
              </li >
            </ul>
          </li>

        </ul>
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
  );
  }
});

module.exports = App;
