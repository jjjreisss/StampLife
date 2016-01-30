var Dispatcher = require('../dispatcher/dispatcher');

var DrawingComparatorActions = {
  receiveDrawingComparator: function(drawingComparator) {
    Dispatcher.dispatch({
      actionType: "DRAWING_COMPARATOR_RECEIVED",
      drawingComparator: drawingComparator
    });
  },
}

module.exports = DrawingComparatorActions;
