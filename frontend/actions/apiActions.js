var Dispatcher = require('../dispatcher/dispatcher');

var ApiActions = {
  receiveSingleDrawing: function(drawing) {
    Dispatcher.dispatch({
      actionType: "DRAWING_RECEIVED",
      drawing: drawing
    });
  },

  receiveAllDrawings: function(drawings) {
    Dispatcher.dispatch({
      actionType: "DRAWINGS_RECEIVED",
      drawings: drawings
    })
  }
}

module.exports = ApiActions;
