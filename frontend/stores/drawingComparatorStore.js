var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher');

var DrawingComparatorStore = new Store(AppDispatcher);
var _drawingComparator;


var receiveDrawingComparator = function(drawingComparator) {
  _drawingComparator = drawingComparator;
};

DrawingComparatorStore.comparator = function() {
  return _drawingComparator;
};

DrawingComparatorStore.__onDispatch = function(payload) {
  switch(payload.actionType) {
    case "DRAWING_COMPARATOR_RECEIVED":
      receiveDrawingComparator(payload.drawingComparator);
      DrawingComparatorStore.__emitChange();
      break;
  }
};

module.exports = DrawingComparatorStore;
