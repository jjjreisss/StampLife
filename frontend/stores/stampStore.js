var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher');

var StampStore = new Store(AppDispatcher);
var _stamps = [];
var stamp;

var resetStamps = function(stamps) {
  _stamps = stamps;
};

var resetStamp = function(stamp) {
  _stamp = stamp;
};

var receiveStamp = function(stamp) {
  _stamps.push(stamp);
};

StampStore.single = function() {
  return _stamp;
};

StampStore.all = function() {
  return _stamps.slice();
};

StampStore.__onDispatch = function(payload) {
  switch(payload.actionType) {
    case "STAMP_RECEIVED":
      resetStamp(payload.stamp);
      StampStore.__emitChange();
      break;
    case "STAMPS_RECEIVED":
      resetStamps(payload.stamps);
      StampStore.__emitChange();
      break;
  }
}
