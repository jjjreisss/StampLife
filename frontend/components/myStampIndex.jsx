var React = require('react');
var ApiUtil = require('../util/apiUtil');
var MyStampListItem = require('./myStampListItem');
var MyStampStore = require('../stores/myStampStore');

var MyStampIndex = React.createClass({
  getInitialState: function() {
    return({
      stamps: null
    });
  },
  componentDidMount: function() {
    this.listener = MyStampStore.addListener(this._onChange);
    // ApiUtil.fetchMyStamp();
  },
  componentWillUnmount: function() {
    this.listener.remove();
  },
  _onChange: function() {
    this.setState({
      stamps: MyStampStore.all()
    })
  },

  render: function() {
    var stampsList = "";
    if (this.state.stamps) {
      stampsList = this.state.stamps.map(function(stamp, idx){
        return (
          <MyStampListItem
            key={idx}
            stampId={stamp.id}
            imageUrl={stamp.image_url}
            size={100}/>
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

module.exports = MyStampIndex;
