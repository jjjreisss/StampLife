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

  addToMyStamp: function(id) {
    $.ajax({
      url: "api/stamps/" + id,
      method: "GET",
      success: function(stamp) {
        ApiActions.addToMyStamp(stamp);
      }
    });
  },

};

module.exports = ApiUtil;
