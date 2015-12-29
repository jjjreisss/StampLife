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

  render: function() {
    var stampsList = "";
    if (this.state.stamps) {
      var sortedStamps = this.state.stamps.sort(function(a, b) {
        return a.stamp_uses.length < b.stamp_uses.length;
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
