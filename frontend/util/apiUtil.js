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

  fetchChangedDrawing: function(id) {
    $.ajax({
      url: "api/drawings/" + id,
      method: "GET",
      success: function(drawing) {
        ApiActions.receiveChangedDrawing(drawing);
      }
    });
  },

  resetSingleDrawing: function(id) {
    $.ajax({
      url: "api/drawings/" + id,
      method: "GET",
      success: function(drawing) {
        ApiActions.resetSingleDrawing(drawing);
      }
    })
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

  addInitialStamps: function(callback) {
    $.ajax({
      url: "api/stamps/" + 111,
      method: "GET",
      success: function(stamp) {
        ApiActions.addToMyStamp(stamp);
        $.ajax({
          url: "api/stamps/" + 112,
          method: "GET",
          success: function(stamp) {
            ApiActions.addToMyStamp(stamp);
            $.ajax({
              url: "api/stamps/" + 113,
              method: "GET",
              success: function(stamp) {
                ApiActions.addToMyStamp(stamp);
                $.ajax({
                  url: "api/stamps/" + 114,
                  method: "GET",
                  success: function(stamp) {
                    ApiActions.addToMyStamp(stamp);
                    $.ajax({
                      url: "api/stamps/" + 115,
                      method: "GET",
                      success: function(stamp) {
                        ApiActions.addToMyStamp(stamp);
                        callback();
                      }
                    });
                  }
                });
              }
            });
          }
        });
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
        ApiUtil.fetchChangedDrawing(drawingId);
        // ApiUtil.fetchDrawing(drawingId);
      },
    });
  },

  unlikeDrawing: function(likeId, drawingId) {
    $.ajax({
      url: "api/likes/" + likeId,
      method: "DELETE",
      success: function() {
        ApiUtil.fetchChangedDrawing(drawingId);
        // ApiUtil.fetchDrawing(drawingId);
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

  startTour: function(callback) {
    $.ajax({
      url: 'users/1',
      method: 'GET',
      success: function(user) {
        if (user.tour_one_completed === false) {
          window.wholeDamnTour.start();
          ApiUtil.addInitialStamps(callback);
          ApiUtil.completeTourOne();
        }
      }.bind(this),
      error: function() {
      }
    });
  },

  deleteDrawing: function(id) {
    $.ajax({
      url: "api/drawings/" + id,
      method: "DELETE",
      success: function(message) {
        console.log(message.message);
        console.log("delete successful");
      },
      error: function(message) {
        console.log(message.message);
      }
    });
  },

  deleteStamp: function(id) {
    $.ajax({
      url: "api/stamps/" + this.props.stampId,
      method: "DELETE",
      success: function(message) {
        console.log(message.message);
        console.log("delete successful");
      },
      error: function(message) {
        console.log(message.message);
      }
    });
  }

};

module.exports = ApiUtil;
