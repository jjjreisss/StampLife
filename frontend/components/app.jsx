var React = require('react');
var StampIndex = require('./stampIndex');
var MyStampIndex = require('./myStampIndex');
var Shepherd = require('tether-shepherd');

var App = React.createClass({
  componentDidMount: function() {
    var tour = new Shepherd.Tour({
      defaults: {
        classes: 'shepherd-theme-arrows'
      }
    });

    tour.addStep('example', {
      title: 'Welcome!',
      text: [
        "Welcome to Salamander. This app lets you make your own stamps,",
        "which you can use to draw with and share with other users."
      ],
      showCancelLink: true,
      buttons: [
        {
          text: 'Next',
          action: tour.next
        }
      ],
      classes: 'shepherd-theme-arrows'
    });

    tour.addStep('pick-color', {
      title: 'Pick Color',
      text: [
        "Click anywhere on the spectrum to choose your color.",
        "Click and drag to watch your color change in real time."
      ],
      buttons: [
        {
          text: 'Next',
          action: tour.next
        }
      ],
      classes: 'shepherd-theme-arrows',
      attachTo: '#color-picker'
    });

    tour.addStep('recent-colors', {
      title: 'Recent Colors',
      text: [
        "Recently used colors show up here.",
        "Click one to use that color again."
      ],
      buttons: [
        {
          text: 'Next',
          action: tour.next
        }
      ],
      classes: 'shepherd-theme-arrows',
      attachTo: '#color-bar right'
    });

    tour.addStep('pick-size', {
      title: 'Pick Size',
      text: [
        "Click anywhere on this sidebar to choose your stroke size."
      ],
      buttons: [
        {
          text: 'Next',
          action: tour.next
        }
      ],
      classes: 'shepherd-theme-arrows',
      attachTo: '#size-picker left'
    });

    tour.addStep('mousewheel', {
      title: 'Use the Mouse Wheel!',
      text: [
        "You can also use the mousewheel to resize your stroke.",
        "Try hovering over the canvas and watching the sample stroke",
        "get bigger and smaller."
      ],
      buttons: [
        {
          text: 'Next',
          action: tour.next
        }
      ],
      classes: 'shepherd-theme-arrows',
      attachTo: '#drawing-canvas'
    });

    tour.addStep('save', {
      title: 'Save Your Stamp',
      text: [
        "Once you've drawn what you like, click here to save your",
        "stamp so you can use it later."
      ],
      buttons: [
        {
          text: 'Next',
          action: tour.next
        }
      ],
      classes: 'shepherd-theme-arrows',
      attachTo: '.save-to-my-stamps bottom'
    });

    tour.addStep('my-stamps', {
      title: 'Stamp Toolbar',
      text: [
        "Your active stamps live in this toolbar.",
      ],
      buttons: [
        {
          text: 'Next',
          action: tour.next
        }
      ],
      classes: 'shepherd-theme-arrows',
      attachTo: '.stamp-sidebar'
    });

    tour.addStep('get-stamps', {
      text: [
        "But one stamp is not enough... Let's get more!",
        "Click the 'Menu' button, then 'Get Stamps'"
      ],
      buttons: [
        {
          text: 'Next',
          action: tour.next
        }
      ],
      classes: 'shepherd-theme-arrows',
      attachTo: '.ghost bottom'
    });

    tour.addStep('sort-stamps', {
      text: [
        "This page contains all the stamps from all the site's users.",
        "Sort stamps by popularity or by when they were made.",
        "Click on a stamp to add it to your stamp toolbar.",
        "Your toolbar can hold up to five stamps."
      ],
      buttons: [
        {
          text: 'Next',
          action: tour.next
        }
      ],
      classes: 'shepherd-theme-arrows',
      attachTo: '.index-header'
    });

    tour.addStep('stamp-detail', {
      text: [
        "Click the field in the upper left to see who has used a certain stamp.",
      ],
      buttons: [
        {
          text: 'Next',
          action: tour.next
        }
      ],
      classes: 'shepherd-theme-arrows',
      attachTo: '.index-element'
    });

    tour.addStep('sort-stamps', {
      text: [
        "Once you have all the stamps you want to use in your drawing,",
        "click 'Menu', then 'New Drawing'."
      ],
      buttons: [
        {
          text: 'Next',
          action: tour.next
        }
      ],
      classes: 'shepherd-theme-arrows',
      attachTo: '.index-header'
    });

    tour.addStep('select-stamp', {
      text: [
        "When making a drawing, you can do everything you could when",
        "making a stamp.",
        "You can also select a stamp to USE by clicking on it down here."
      ],
      buttons: [
        {
          text: 'Next',
          action: tour.next
        }
      ],
      classes: 'shepherd-theme-arrows',
      attachTo: '.stamp-sidebar'
    });

    tour.addStep('turn-stamping-on', {
      text: [
        "After selecting a stamp, click here to turn stamping on, then go",
        "over to the canvas and use your stamp!",
        "Just like before, use the mousewheel to make it bigger and smaller."
      ],
      buttons: [
        {
          text: 'Next',
          action: tour.next
        }
      ],
      classes: 'shepherd-theme-arrows',
      attachTo: '#toggle-stamping bottom'
    });

    tour.addStep('save-drawing', {
      text: [
        "When you're satisfied, save your drawing. Then go to the Menu",
        "and check out 'All Drawings'."
      ],
      buttons: [
        {
          text: 'Next',
          action: tour.next
        }
      ],
      classes: 'shepherd-theme-arrows',
      attachTo: '.save-drawing'
    });

    tour.addStep('save-drawing', {
      text: [
        "Feel free to like other people's drawings, see who has been liking",
        "what, and visit other users' profile pages."
      ],
      buttons: [
        {
          text: 'Next',
          action: tour.next
        }
      ],
      classes: 'shepherd-theme-arrows',
      attachTo: '.index-element'
    });


    tour.start();
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
