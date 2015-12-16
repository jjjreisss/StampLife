var Dispatcher = require('../dispatcher/dispatcher');

var ApiActions = {
  receiveSingleDrawing: function(drawing) {
    Dispatcher.dispatch({
      actionType: "DRAWING_RECEIVED",
      drawing: drawing
    });
  }
}

module.exports = ApiActions;
