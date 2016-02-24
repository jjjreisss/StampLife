var React = require('react');
var DrawingStore = require('../../stores/drawingStore');
var DrawingComparatorStore = require('../../stores/drawingComparatorStore');
var ApiUtil = require('../../util/apiUtil');
var DrawingListItem = require('../index/drawingListItem');
var ApiActions = require('../../actions/apiActions');
var DrawingComparatorActions = require('../../actions/drawingComparatorActions');
var Comparators = require('../../util/comparators');

var DrawingIndex = React.createClass({
  getInitialState: function() {
    return({
      drawings: null,
      selectedTab: "popularity",
      comparator: Comparators.drawingPopularity,
      drawingsList: null
    });
  },
  componentDidMount: function() {
    this.drawingStoreListener = DrawingStore.addListener(this._onChange);
    DrawingComparatorActions.receiveDrawingComparator(Comparators.drawingPopularity);
    ApiUtil.fetchAllDrawings();
    if (window.wholeDamnTour.currentStep && window.wholeDamnTour.currentStep.id === "save-drawing") {
      window.setTimeout(function() {
        window.wholeDamnTour.next();
      }, 200);
    };
    this.setState({drawingsList: this.loader()})
  },
  componentWillUnmount: function() {
    this.drawingStoreListener.remove();
  },
  _onChange: function() {
    this.setState({
      drawings: DrawingStore.all().reverse(),
      comparator: DrawingComparatorStore.comparator()
    })
    this.setDrawingsList();
  },
  sortByNewness: function() {
    this.setState({drawingsList: this.loader()})
    DrawingComparatorActions.receiveDrawingComparator(Comparators.drawingNewness);
    ApiUtil.fetchAllDrawings();
    this.setState({
      selectedTab: "newness"
    });
  },
  sortByPopularity: function(e) {
    this.setState({drawingsList: this.loader()})
    DrawingComparatorActions.receiveDrawingComparator(Comparators.drawingPopularity);
    ApiUtil.fetchAllDrawings()
    this.setState({
      selectedTab: "popularity"
    });
  },

  setDrawingsList: function() {
    var sortedDrawings = this.state.drawings.sort(this.state.comparator);
    drawingsList = sortedDrawings.map(function(drawing, idx){
      return (
        <DrawingListItem
          key={idx}
          drawing={drawing}/>
      );
    });
    this.setState({drawingsList: drawingsList})
  },

  popularityComparator: function(a, b) {
    if (a.likes.length < b.likes.length) {
      return 1;
    } else if (a.likes.length === b.likes.length) {
      return 0;
    } else {
      return -1;
    }
  },

  newnessComparator: function(a, b) {
    if (a.created_at < b.created_at) {
      return 1;
    } else if (a.created_at === b.created_at) {
      return 0;
    } else {
      return -1;
    }
  },

  loader: function() {
    return (
      <div className="cssload-loading">
        <div className="cssload-dot"></div>
        <div className="cssload-dot2"></div>
      </div>
    )
  },

  render: function() {
    var popularitySelected =
      this.state.selectedTab === "popularity" ? "selected-tab" : "";
    var newnessSelected =
      this.state.selectedTab === "newness" ? "selected-tab" : "";

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
            onClick={this.sortByNewness}
            id={newnessSelected}>
            <span>
              Newest Drawings
            </span>
          </span>
        </h1>
          <div className="index-contents">
            {this.state.drawingsList}
          </div>
      </div>
    );
  }

});

module.exports = DrawingIndex;
