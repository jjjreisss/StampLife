var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher');

var DrawingStore = new Store(AppDispatcher);
var _drawings = {};

var resetDrawing = function(drawing) {
  _drawings = drawing;
}

DrawingStore.all = function() {
  return _drawings;
}

DrawingStore.__onDispatch = function(payload) {
  switch(payload.actionType) {
    case "DRAWING_RECEIVED":
      resetDrawing(payload.drawing);
      DrawingStore.__emitChange();
      break;
  }
}

module.exports = DrawingStore;
