var React = require('react');
var ApiUtil = require('../../util/apiUtil');
var StampListItem = require('../index/stampListItem');
var StampStore = require('../../stores/stampStore');
var DrawingComparatorActions = require('../../actions/drawingComparatorActions');
var DrawingComparatorStore = require('../../stores/drawingComparatorStore');
var Comparators = require('../../util/comparators');


var StampIndex = React.createClass({
  getInitialState: function() {
    return({
      stamps: null,
      selectedTab: "popularity",
      comparator: Comparators.stampPopularity,
      stampsList: null
    });
  },
  componentDidMount: function() {
    this.listener = StampStore.addListener(this._onChange);
    DrawingComparatorActions.receiveDrawingComparator(Comparators.stampPopularity);
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
    DrawingComparatorActions.receiveDrawingComparator(Comparators.stampNewness);
    ApiUtil.fetchAllStamps();
    this.setState({
      selectedTab: "newness"
    });
  },
  sortByPopularity: function(e) {
    this.setState({stampsList: this.loader()})
    DrawingComparatorActions.receiveDrawingComparator(Comparators.stampPopularity);
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

  loader: function() {
    return (
      <div className="cssload-loading">
        <div className="cssload-dot"></div>
        <div className="cssload-dot2"></div>
      </div>
    )
  },
  displayAttributes: function() {
    return ({
      popularitySelected:
        this.state.selectedTab === "popularity" ? "selected-tab" : "",
      newestSelected:
        this.state.selectedTab === "newness" ? "selected-tab" : "",
    })
  },

  render: function() {
    return(
      <div className="index">
        <h1 className="index-header">
          <span
            className="index-tab"
            onClick={this.sortByPopularity}
            id={this.displayAttributes().popularitySelected}>
            <span>
              Most Popular Stamps
            </span>
          </span>
          <span
            className="index-tab"
            onClick={this.sortByNewness}
            id={this.displayAttributes().newestSelected}>
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
