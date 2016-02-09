var React = require('react');
var ApiUtil = require('../util/apiUtil');
var StampListItem = require('./stampListItem');
var StampStore = require('../stores/stampStore');
var DrawingComparatorActions = require('../actions/drawingComparatorActions');
var DrawingComparatorStore = require('../stores/drawingComparatorStore');


var StampIndex = React.createClass({
  getInitialState: function() {
    return({
      stamps: null,
      selectedTab: "popularity",
      comparator:
        function(a, b) {
          if (a.stamp_uses.length < b.stamp_uses.length) {
            return 1;
          } else if (a.stamp_uses.length === b.stamp_uses.length) {
            return 0;
          } else {
            return -1;
          }
        },
      stampsList: null
    });
  },
  componentDidMount: function() {
    this.listener = StampStore.addListener(this._onChange);
    DrawingComparatorActions.receiveDrawingComparator(this.popularityComparator);
    ApiUtil.fetchAllStamps();
    if (window.wholeDamnTour.currentStep && window.wholeDamnTour.currentStep.id === 'get-stamps') {
      window.setTimeout(function() {
        window.wholeDamnTour.next();
      }, 200);
    }
    this.setState({drawingsList: this.loader()})
  },
  componentWillUnmount: function() {
    this.listener.remove();
  },
  _onChange: function() {
    this.setState({
      stamps: StampStore.all().reverse(),
      comparator: DrawingComparatorStore.comparator()
    });
    this.setStampsList();
  },
  sortByNewness: function() {
    this.setState({stampsList: this.loader()})
    DrawingComparatorActions.receiveDrawingComparator(this.newnessComparator);
    ApiUtil.fetchAllStamps();
    this.setState({
      selectedTab: "newness"
    });
  },
  sortByPopularity: function(e) {
    this.setState({stampsList: this.loader()})
    DrawingComparatorActions.receiveDrawingComparator(this.popularityComparator);
    ApiUtil.fetchAllStamps()
    this.setState({
      selectedTab: "popularity"
    });
  },
  setStampsList: function() {
    var sortedStamps = this.state.stamps.sort(this.state.comparator);
    stampsList = sortedStamps.map(function(stamp, idx){
      return (
        <StampListItem
          key={idx}
          stampId={stamp.id}
          imageUrl={stamp.image_url}
          size={150}
          stamp={stamp}/>
      );
    });
    this.setState({stampsList: stampsList});
  },
  popularityComparator: function(a, b) {
    if (a.stamp_uses.length < b.stamp_uses.length) {
      return 1;
    } else if (a.stamp_uses.length === b.stamp_uses.length) {
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
    var newestSelected =
      this.state.selectedTab === "newness" ? "selected-tab" : "";

    return(
      <div className="index">
        <h1 className="index-header">
          <span
            className="index-tab"
            onClick={this.sortByPopularity}
            id={popularitySelected}>
            <span>
              Most Popular Stamps
            </span>
          </span>
          <span
            className="index-tab"
            onClick={this.sortByNewness}
            id={newestSelected}>
            <span>
              Newest Stamps
            </span>
          </span>
        </h1>
        <div className="index-contents">
          {this.state.stampsList}
        </div>
      </div>
    );
  }

});

module.exports = StampIndex;
