var React = require('react');
var DrawingStore = require('../stores/drawingStore');
var ApiUtil = require('../util/apiUtil');
var DrawingListItem = require('./drawingListItem');
var drawingIndexTour = require('../util/drawingIndexTour');

var DrawingIndex = React.createClass({
  getInitialState: function() {
    return({
      drawings: null,
      selectedTab: "popularity",
      comparator:
        function(a, b) {
          if (a.likes.length < b.likes.length) {
            return 1;
          } else if (a.likes.length === b.likes.length) {
            return 0;
          } else {
            return -1;
          }
        },
    });
  },
  componentDidMount: function() {
    this.listener = DrawingStore.addListener(this._onChange);
    ApiUtil.fetchAllDrawings();

    // $.ajax({
    //   url: 'users/1',
    //   method: 'GET',
    //   success: function(user) {
    //     if (user.tour_four_completed === false) {
    //       drawingIndexTour.start();
    //       ApiUtil.completeTourFour();
    //     }
    //   }.bind(this),
    // });
    if (window.wholeDamnTour.currentStep && window.wholeDamnTour.currentStep.id === "save-drawing") {
      window.setTimeout(function() {
        window.wholeDamnTour.next();
      }, 200);
    };
  },
  componentWillUnmount: function() {
    this.listener.remove();
  },
  _onChange: function() {
    this.setState({drawings: DrawingStore.all().reverse()});
  },
  sortByNewest: function() {
    // ApiUtil.fetchAllDrawings()
    var comparator =
      function(a, b) {
        if (a.created_at < b.created_at) {
          return 1;
        } else if (a.created_at === b.created_at) {
          return 0;
        } else {
          return -1;
        }
      };
    this.setState({
      comparator: comparator,
      selectedTab: "newest"
    });
  },
  sortByPopularity: function(e) {
    // ApiUtil.fetchAllDrawings()
    var comparator =
      function(a, b) {
        if (a.likes.length < b.likes.length) {
          return 1;
        } else if (a.likes.length === b.likes.length) {
          return 0;
        } else {
          return -1;
        }
      };
    this.setState({
      comparator: comparator,
      selectedTab: "popularity"
    });
  },

  render: function() {
    var popularitySelected =
      this.state.selectedTab === "popularity" ? "selected-tab" : "";
    var newestSelected =
      this.state.selectedTab === "newest" ? "selected-tab" : "";

    var drawingsList = "";
    if (this.state.drawings) {
      var sortedDrawings = this.state.drawings.sort(this.state.comparator);
      drawingsList = sortedDrawings.map(function(drawing, idx){
        return (
          <DrawingListItem
            key={idx}
            drawingId={drawing.id}
            imageUrl={drawing.image_url}
            drawing={drawing}/>
        );
      });
    }
    return(
      <div className="index">
        <h1 className="index-header">
          <span
            className="index-tab"
            onClick={this.sortByPopularity}
            id={popularitySelected}>
            <span>
              Most Popular Drawings
            </span>
          </span>
          <span
            className="index-tab"
            onClick={this.sortByNewest}
            id={newestSelected}>
            <span>
              Newest Drawings
            </span>
          </span>
        </h1>
          <div className="index-contents">
            {drawingsList}
          </div>
      </div>
    );
  }

});

module.exports = DrawingIndex;


// function draw() {
//     	// Erasing line
//     	var canvas = document.getElementById("eraseLine");
//     	if (canvas.getContext) {
//         	var ctx = canvas.getContext("2d");
//
//         	// Black background square
//         	ctx.fillRect(0, 0, 200, 200);
//
//         	// Erasing curved line
//         	ctx.globalCompositeOperation = "destination-out";
//
//         	ctx.beginPath();
//         	ctx.moveTo(160, 40);
//         	ctx.bezierCurveTo(90, 10, 60, 20, 10, 90);
//
//         	ctx.lineWidth = 7;
//         	ctx.stroke();
//     	}
// }
