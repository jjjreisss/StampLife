var React = require('react');
var DrawingStore = require('../stores/drawingStore')
var ApiUtil = require('../util/apiUtil');

var DrawingIndex = React.createClass({
  getInitialState: function() {
    return({
      drawings: DrawingStore.all()
    })
  },
  componentDidMount: function() {
    this.listener = DrawingStore.addListener(this._onChange);
    ApiUtil.fetchAllDrawings();
  },
  componentWillUnmount: function() {
    this.listener.remove();
  },
  _onChange: function() {
    this.setState({drawings: DrawingStore.all()})
  },
  goToShow: function(e) {
    var id = e.target.attributes["data-idx"].value;
    console.log(id)
    this.props.history.push('drawing/' + id)
  },
  render: function() {
    that = this;
    return(
      <div>
        {this.state.drawings.map(
          function(drawing, idx){
            var url = "http://res.cloudinary.com/ddhru3qpb/image/upload/w_150,h_150/" + drawing.image_url + ".png"
            return (
              <div key={drawing.id}>
                <img src={url}
                  data-idx={drawing.id}
                  onClick={this.goToShow}/>
              </div>
            )
          }.bind(this))
        }
      </div>
    )

  }

});

module.exports = DrawingIndex;
"http://res.cloudinary.com/ddhru3qpb/image/upload/v1450330681/a1tgeenaicrcsmlfemdr.png"
