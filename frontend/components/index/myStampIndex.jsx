var React = require('react');
var ApiUtil = require('../../util/apiUtil');
var MyStampListItem = require('../index/myStampListItem');
var MyStampStore = require('../../stores/myStampStore');
var History = require('react-router').History;


var MyStampIndex = React.createClass({
  mixins: [History],

  getInitialState: function() {
    return({
      stamps: null,
      selected: null
    });
  },
  componentDidMount: function() {
    this.listener = MyStampStore.addListener(this._onChange);
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
  goToStampsIndex: function() {
    this.history.push('stamps');
  },
  goToNewStamp: function() {
    this.history.push('stamp/new');
  },
  stampsList: function() {
    var stampsList = "";
    if (this.state.stamps) {
      stampsList = this.state.stamps.map(function(stamp, idx){
        var selected = (this.state.selected === idx) ? "selected-stamp" : "";
        return (
          <MyStampListItem
            stampId={stamp.id}
            imageUrl={stamp.image_url}
            size={100}
            key={idx}
            data-idx={idx}
            onClick={this.selectStamp}
            id={selected}/>
        );
      }.bind(this));
    }
    return stampsList;
  },

  render: function() {
    return(
      <div className="my-stamp-index">
        <div className="my-stamp-index-screen">
        {this.stampsList()}
        </div>
      </div>
    );
  }

});

module.exports = MyStampIndex;
