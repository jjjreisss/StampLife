var Dispatcher = require('../dispatcher/dispatcher');

var ApiActions = {
  receiveSingleDrawing: function(drawing) {
    Dispatcher.dispatch({
      actionType: "DRAWING_RECEIVED",
      drawing: drawing
    });
  },

  receiveChangedDrawing: function(changedDrawing) {
    Dispatcher.dispatch({
      actionType: "CHANGED_DRAWING_RECEIVED",
      changedDrawing: changedDrawing
    });
  },

  receiveAllDrawings: function(drawings) {
    Dispatcher.dispatch({
      actionType: "DRAWINGS_RECEIVED",
      drawings: drawings
    });
  },

  receiveSingleStamp: function(stamp) {
    Dispatcher.dispatch({
      actionType: "STAMP_RECEIVED",
      stamp: stamp
    })
  },

  receiveAllStamps: function(stamps) {
    Dispatcher.dispatch({
      actionType: "STAMPS_RECEIVED",
      stamps: stamps
    })
  },

  setStamp: function(stamp) {
    Dispatcher.dispatch({
      actionType: "SET_STAMP",
      stamp: stamp
    })
  },

  addToMyStamp: function(stamp) {
    Dispatcher.dispatch({
      actionType: "ADD_STAMP",
      stamp: stamp
    })
  },

  deleteMyStamp: function(id) {
    Dispatcher.dispatch({
      actionType: "DELETE_MY_STAMP",
      id: id
    })
  },

  resetSingleDrawing: function(drawing) {
    Dispatcher.dispatch({
      actionType: "RESET_SINGLE_DRAWING",
      drawing: drawing
    })
  },

  triggerDrawingStore: function() {
    Dispatcher.dispatch({
      actionType: "TRIGGER_DRAWING_STORE"
    })
  }
};

module.exports = ApiActions;
