var React = require('react');
var ApiUtil = require('../util/apiUtil');
var StampListItem = require('./stampListItem');
var StampStore = require('../stores/stampStore');

var StampIndex = React.createClass({
  getInitialState: function() {
    return({
      stamps: null
    });
  },
  componentDidMount: function() {
    this.listener = StampStore.addListener(this._onChange);
    ApiUtil.fetchAllStamps();
  },
  componentWillUnmount: function() {
    this.listener.remove();
  },
  _onChange: function() {
    var allStamps = StampStore.all().reverse();
    this.setState({stamps: allStamps});
  },
  // mergeSort: function(array, comparator) {
  //   if (array.length < 2) {
  //     return array;
  //   }
  //
  //   var middle = Math.floor(array.length / 2);
  //   var left = array.slice(0, middle);
  //   var right = array.slice(middle);
  //
  //   return this.merge(
  //     this.mergeSort(left, comparator), this.mergeSort(right, comparator), comparator
  //   );
  // },
  // merge: function(left, right, comparator) {
  //   var result = [];
  //   var i = 0;
  //   var j = 0;
  //
  //   while (i < left.length && j < right.length) {
  //     if (comparator(left[i], right[j]) === -1)
  //   }
  // },

  render: function() {
    var stampsList = "";
    if (this.state.stamps) {
      var sortedStamps = this.state.stamps.sort(function(a, b) {
        if (a.stamp_uses.length < b.stamp_uses.length) {
          return 1;
        } else if (a.stamp_uses.length === b.stamp_uses.length) {
          return 0;
        } else {
          return -1;
        }
      });
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
        <h1>Most Popular Stamps</h1>
        {stampsList}
      </div>
    );
  }

});

module.exports = StampIndex;
