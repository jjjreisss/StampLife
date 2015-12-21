var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher');

var UserStampStore = new Store(AppDispatcher);
var _stamps = [];
var _stamp;

var resetStamps = function(stamps) {
  _stamps = stamps;
};

var resetStamp = function(stamp) {
  _stamp = stamp;
};

var receiveStamp = function(stamp) {
  _stamps.push(stamp);
};

UserStampStore.single = function() {
  return _stamp;
};

UserStampStore.all = function() {
  return _stamps.slice();
};

UserStampStore.__onDispatch = function(payload) {
  switch(payload.actionType) {
    case "SET_STAMP":
      resetStamp(payload.stamp);
      UserStampStore.__emitChange();
      break;
    case "STAMPS_RECEIVED":
      resetStamps(payload.stamps);
      UserStampStore.__emitChange();
      break;
    case "STAMP_RECEIVED":
      receiveStamp(payload.stamp)
      UserStampStore.__emitChange();
  }
}

module.exports = StampStore;
