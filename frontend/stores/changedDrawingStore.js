var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher');

var ChangedDrawingStore = new Store(AppDispatcher);
// var _changedDrawing;
//
//
// var receiveChangedDrawing = function(changedDrawing) {
//   _changedDrawing = changedDrawing;
// };
//
// ChangedDrawingStore.drawing = function() {
//   return _changedDrawing;
// };
//
ChangedDrawingStore.__onDispatch = function(payload) {
//   switch(payload.actionType) {
//     case "CHANGED_DRAWING_RECEIVED":
//       receiveChangedDrawing(payload.changedDrawing);
//       ChangedDrawingStore.__emitChange();
//       break;
//   }
};

module.exports = ChangedDrawingStore;
