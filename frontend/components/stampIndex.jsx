var React = require('react');
var ApiUtil = require('../util/apiUtil');
var StampListItem = require('./stampListItem');
var StampStore = require('../stores/stampStore');
var getStampsTour = require('../util/getStampsTour');

var StampIndex = React.createClass({
  getInitialState: function() {
    return({
      stamps: null,
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
      selectedTab: "popularity"
    });
  },
  componentDidMount: function() {
    this.listener = StampStore.addListener(this._onChange);
    ApiUtil.fetchAllStamps();

    // $.ajax({
    //   url: 'users/1',
    //   method: 'GET',
    //   success: function(user) {
    //     if (user.tour_two_completed === false) {
    //       getStampsTour.start();
    //       ApiUtil.completeTourTwo();
    //     }
    //   }.bind(this),
    // });

    if (window.wholeDamnTour.currentStep && window.wholeDamnTour.currentStep.id === 'get-stamps') {
      window.wholeDamnTour.next();
    }
  },
  componentWillUnmount: function() {
    this.listener.remove();
  },
  _onChange: function() {
    var allStamps = StampStore.all().reverse();
    this.setState({stamps: allStamps});
  },
  sortByNewest: function() {
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
    var comparator =
      function(a, b) {
        if (a.stamp_uses.length < b.stamp_uses.length) {
          return 1;
        } else if (a.stamp_uses.length === b.stamp_uses.length) {
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
    var stampsList = "";
    if (this.state.stamps) {
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
    }
    return(
      <div className="index">
        <h1 className="index-header">
          <span
            className="index-tab"
            onClick={this.sortByPopularity}
            id={popularitySelected}>
            Most Popular Stamps
          </span>
          <span
            className="index-tab"
            onClick={this.sortByNewest}
            id={newestSelected}>
            Newest Stamps
          </span>
        </h1>
        <div className="index-contents">
          {stampsList}
        </div>
      </div>
    );
  }

});

module.exports = StampIndex;
