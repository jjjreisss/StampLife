var React = require('react');
var History = require('react-router').History;
var ApiUtil = require('../../util/apiUtil');
var ChangedDrawingStore = require('../../stores/changedDrawingStore');
// var DrawingStore = require('../../stores/drawingStore');

var DrawingListItem = React.createClass({
  mixins: [History],

  getInitialState: function() {
    return({
      hover: false,
      likesClicked: false,
      drawing: this.props.drawing
    });
  },
  componentDidMount: function() {
    this.changedDrawingStoreListener = ChangedDrawingStore.addListener(this._onChange);
    // this.drawingStoreListener = DrawingStore.addListener(this._onChange);
  },
  componentWillUnmount: function() {
    this.changedDrawingStoreListener.remove();
    // this.drawingStoreListener.remove();
  },
  componentWillReceiveProps: function(newProps) {
    if(newProps.drawing.id != this.state.drawing.id) {
      this.setState({drawing: newProps.drawing})
    }
  },
  _onChange: function() {
    var changedDrawing = ChangedDrawingStore.drawing();
    if (changedDrawing && changedDrawing.id === this.state.drawing.id) {
      this.setState({drawing: changedDrawing});
    }
    // var newDrawing = DrawingStore.single();
    // if (newDrawing && newDrawing.id === this.state.drawing.id) {
    //   this.setState({drawing: newDrawing});
    // }
  },
  goToShow: function() {
    this.history.push('drawings/' + this.state.drawing.id);
  },
  enhover: function() {
    this.setState({hover: true});
  },
  dehover: function() {
    this.setState({hover: false});
  },
  goToUser: function(e) {
    e.stopPropagation();
    var username = this.state.drawing.username;
    this.history.push('users/' + username);
  },
  toggleLike: function(e) {
    e.stopPropagation();
    if (!this.state.drawing.liked_by_current_user){
      ApiUtil.likeDrawing(this.state.drawing.id);
    }
    else if (this.state.drawing.liked_by_current_user) {
      ApiUtil.unlikeDrawing(this.state.drawing.current_like_id, this.state.drawing.id);
    }
  },
  toggleList: function(e) {
    e.stopPropagation();
    this.setState({likesClicked: !this.state.likesClicked});
  },
  drawingLikeList: function() {
    return this.state.drawing.likes.map(function(like, i) {
      return (
        <div key={i}>
          {like}
        </div>
      );
    });
  },
  timeAgo: function() {
    var timeAgo = this.state.drawing.time_ago;
    if (timeAgo.slice(0,5) === "about") {
      timeAgo = timeAgo.slice(6);
    }
    if (timeAgo.slice(0,4) === "less") {
      timeAgo = timeAgo.slice(10);
    }
    return timeAgo;
  },
  displayAttributes: function() {
    return ({
      drawingAuthor: (this.state.hover ? "drawing-author" : "hidden"),
      drawingLikesCount: (this.state.hover ? "drawing-likes-count" : "hidden"),
      likeDrawingClass: (this.state.hover ? "like-drawing-class" : "hidden"),
      likeText: (this.state.drawing.liked_by_current_user ? "Unlike" : "Like"),
      drawingLikeList: (this.state.likesClicked ? "drawing-like-list" : "hidden"),
      timeAgo: this.timeAgo(),
      url: "http://res.cloudinary.com/ddhru3qpb/image/upload/w_500,h_500/" + this.state.drawing.image_url + ".png",
    })
  },
  render: function() {
    return (
      <div className="index-element"
            onClick={this.goToShow}
            onMouseEnter={this.enhover}
            onMouseLeave={this.dehover}>
        <img
          className="drawing-index-image"
          src={this.displayAttributes().url}/>
        <div
          className={this.displayAttributes().drawingAuthor}
          onClick={this.goToUser}>
          {this.state.drawing.username}
          <br/>
          {this.displayAttributes().timeAgo}
        </div>
        <div className="drawing-likes-box">
          <div
            className={this.displayAttributes().drawingLikesCount}
            onClick={this.toggleList}>
            <div
              className={this.displayAttributes().drawingLikeList}>
              {this.drawingLikeList()}
            </div>
            {this.state.drawing.likes.length} Likes
          </div>
          <div
            className={this.displayAttributes().likeDrawingClass}
            onClick={this.toggleLike}>
            {this.displayAttributes().likeText}
          </div>
        </div>
      </div>
    );
  }
});

module.exports = DrawingListItem;
