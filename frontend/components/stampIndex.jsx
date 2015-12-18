var React = require('react');
var ApiUtil = require('../util/apiUtil');
var StampListItem = require('./StampListItem');
var StampStore = require('../stores/stampStore');

var StampIndex = React.createClass({
  getInitialState: function() {
    return({
      stamps: StampStore.all()
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
    this.setState({stamps: StampStore.all()});
  },

  render: function() {
    var stampsList = "";
    if (this.state.stamps) {
      stampsList = this.state.stamps.map(function(stamp, idx){
        return (
          <StampListItem
            key={idx}
            stampId={stamp.id}
            imageUrl={stamp.image_url}/>
        );
      });
    }
    return(
      <div className="index">
        {stampsList}
      </div>
    );
  }

});

module.exports = StampIndex;
