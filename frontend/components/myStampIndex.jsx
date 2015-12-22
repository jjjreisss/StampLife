var React = require('react');
var ApiUtil = require('../util/apiUtil');
var MyStampListItem = require('./myStampListItem');
var MyStampStore = require('../stores/myStampStore');

var MyStampIndex = React.createClass({
  getInitialState: function() {
    return({
      stamps: null,
      selected: null
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
    });
  },
  selectStamp: function(e) {
    this.setState({
      selected: parseInt(e.currentTarget.attributes["data-idx"].value)
    });
  },

  render: function() {
    var stampsList = "";
    if (this.state.stamps) {
      stampsList = this.state.stamps.map(function(stamp, idx){
        var selected = (this.state.selected === idx) ? "selected-stamp" : "";
        return (
          <div
            key={idx}
            data-idx={idx}
            onClick={this.selectStamp}
            id={selected}
            className="stamp-index-element">

          <MyStampListItem
            stampId={stamp.id}
            imageUrl={stamp.image_url}
            size={100}/>

          </div>
        );
      }.bind(this));
    }
    return(
      <div className="index">
        My Stamps
        {stampsList}
      </div>
    );
  }

});

module.exports = MyStampIndex;
