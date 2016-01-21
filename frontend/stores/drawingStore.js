var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher');

var DrawingStore = new Store(AppDispatcher);
var _drawings = [];
var _drawing;

var resetDrawings = function(drawings) {
  _drawings = drawings;
};

var resetDrawing = function(drawing) {
  _drawing = drawing;
};

var resetSingleDrawing = function(drawing) {
  var drawingsIds = _drawings.map(function(oldDrawing) {
    return oldDrawing.id;
  })

  index = drawingsIds.indexOf(drawing.id);

  _drawings[index] = drawing;

}

var receiveDrawing = function(drawing) {
  _drawings.push(drawing);
};

DrawingStore.single = function() {
  return _drawing;
};

DrawingStore.all = function() {
  return _drawings.slice();
};

DrawingStore.__onDispatch = function(payload) {
  switch(payload.actionType) {
    case "DRAWING_RECEIVED":
      resetDrawing(payload.drawing);
      resetSingleDrawing(payload.drawing);
      DrawingStore.__emitChange();
      break;
    case "DRAWINGS_RECEIVED":
      resetDrawings(payload.drawings);
      DrawingStore.__emitChange();
      break;
    case "RESET_SINGLE_DRAWING":
      resetSingleDrawing(payload.drawing);
      DrawingStore.__emitChange();
      break;
  }
}

module.exports = DrawingStore;
