var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher');

var MyStampStore = new Store(AppDispatcher);
var _stamps = [];
var _stamp;


var receiveStamp = function(stamp) {
  if(_stamps.length < 5){
    _stamps.push(stamp);
  }
};

var setStamp = function(stamp) {
  _stamp = stamp;
};

var removeStamp = function(id) {
  var stampToRemove = _stamps.find(function(stamp) {
    return stamp.id === id;
  });

  var idxToRemove = _stamps.indexOf(stampToRemove);

  _stamps.splice(idxToRemove, 1);
};


MyStampStore.all = function() {
  return _stamps.slice();
};

MyStampStore.current = function() {
  return _stamp;
};

MyStampStore.__onDispatch = function(payload) {
  switch(payload.actionType) {
    case "ADD_STAMP":
      receiveStamp(payload.stamp);
      MyStampStore.__emitChange();
      break;
    case "DELETE_MY_STAMP":
      removeStamp(payload.id);
      MyStampStore.__emitChange();
      break;
    case "SET_STAMP":
      setStamp(payload.stamp);
      MyStampStore.__emitChange();
      break;
  }
}

module.exports = MyStampStore;
