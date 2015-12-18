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

  fetchDrawing: function(id) {
    $.ajax({
      url: "api/drawings/" + id,
      method: "GET",
      success: function(drawing) {
        ApiActions.receiveSingleDrawing(drawing);
      }
    });
  },

  fetchNewDrawing: function() {
    $.ajax({
      url: "api/drawings/new",
      method: "GET",
      success: function(drawing) {
        ApiActions.receiveSingleDrawing(drawing);
      }
    });
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

  storeImage: function(img) {
    $.ajax({
      url: "api/images",
      method: "POST",
      data: {img: img},
      success: function(image_url) {

      }
    });
  },

  fetchUserDrawings: function(userId) {
    $.ajax({
      url: "api/drawings",
      method: "GET",
      data: {user_id: userId},
      success: function(drawings){
        ApiActions.receiveAllDrawings(drawings);
      }
    });
  }
};

module.exports = ApiUtil;
