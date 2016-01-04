var ApiActions = require('../actions/apiActions');

var ApiUtil = {
  createDrawing: function(drawing) {
    $.ajax({
      url: "api/drawings",
      method: "POST",
      data: {drawing: drawing},
      success: function (drawing) {
        ApiActions.receiveSingleDrawing(drawing);
      }
    });
  },

  createStamp: function(stamp) {
    $.ajax({
      url: "api/stamps",
      method: "POST",
      data: {stamp: stamp},
      success: function(stamp) {
        ApiActions.receiveSingleStamp(stamp);
      }
    })
  },

  createMyStamp: function(stamp) {
    $.ajax({
      url: "api/stamps",
      method: "POST",
      data: {stamp: stamp},
      success: function(stamp) {
        ApiActions.addToMyStamp(stamp);
      }
    })
  },

  fetchDrawing: function(id) {
    $.ajax({
      url: "api/drawings/" + id,
      method: "GET",
      success: function(drawing) {
        ApiActions.receiveSingleDrawing(drawing);
      }
    });
  },

  fetchStamp: function(id) {
    $.ajax({
      url: "api/stamps/" + id,
      method: "GET",
      success: function(stamp) {
        ApiActions.receiveSingleStamp(stamp);
      }
    });
  },

  setStamp: function(id) {
    $.ajax({
      url: "api/stamps/" + id,
      method: "GET",
      success: function(stamp) {
        ApiActions.setStamp(stamp);
      }
    })
  },

  fetchAllDrawings: function() {
    $.ajax({
      url: "api/drawings",
      method: "GET",
      success: function(drawings) {
        ApiActions.receiveAllDrawings(drawings);
      }
    });
  },

  fetchAllStamps: function() {
    $.ajax({
      url: "api/stamps",
      method: "GET",
      success: function(stamps) {
        ApiActions.receiveAllStamps(stamps);
      }
    });
  },

  storeImage: function(img) {
    $.ajax({
      url: "api/images",
      method: "POST",
      data: {img: img},
      success: function(image_url) {

      }
    });
  },

  fetchUserDrawings: function(username) {
    $.ajax({
      url: "api/drawings",
      method: "GET",
      data: {username: username},
      success: function(drawings){
        ApiActions.receiveAllDrawings(drawings);
      }
    });
  },

  fetchUserStamps: function(username) {
    $.ajax({
      url: "api/stamps",
      method: "GET",
      data: {username: username},
      success: function(stamps){
        ApiActions.receiveAllStamps(stamps);
      }
    });
  },

  addToMyStamp: function(id) {
    $.ajax({
      url: "api/stamps/" + id,
      method: "GET",
      success: function(stamp) {
        ApiActions.addToMyStamp(stamp);
      }
    });
  },

  useStamps: function(stampsUsed) {
    $.ajax({
      url: "api/stamp_uses",
      method: "POST",
      data: {stamps_used: stampsUsed},
      success: function() {

      },
    });
  },

  likeDrawing: function(drawingId) {
    $.ajax({
      url: "api/likes",
      method: "POST",
      data: {drawing_id: drawingId},
      success: function() {
        ApiUtil.fetchAllDrawings();
      },
    });
  },

  unlikeDrawing: function(likeId) {
    $.ajax({
      url: "api/likes/" + likeId,
      method: "DELETE",
      success: function() {
        ApiUtil.fetchAllDrawings();
      },
    });
  },

  completeTourOne: function() {
    $.ajax({
      url: "users/1",
      method: "PUT",
      data: {user: {tour_one_completed: true}},
      success: function() {

      }
    });
  },

  completeTourTwo: function() {
    $.ajax({
      url: "users/1",
      method: "PUT",
      data: {user: {tour_two_completed: true}},
      success: function() {

      }
    });
  },

  completeTourThree: function() {
    $.ajax({
      url: "users/1",
      method: "PUT",
      data: {user: {tour_three_completed: true}},
      success: function() {

      }
    });
  },

  completeTourFour: function() {
    $.ajax({
      url: "users/1",
      method: "PUT",
      data: {user: {tour_four_completed: true}},
      success: function() {

      }
    });
  },

};

module.exports = ApiUtil;
