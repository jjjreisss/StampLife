var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher');

var UserStore = new Store(AppDispatcher);
var _users = [];
var _user;

var resetUsers = function(users) {
  _users = users;
};

var resetUser = function(user) {
  _user = user;
};

var receiveUser = function(user) {
  _users.push(user);
};

UserStore.single = function() {
  return _user;
};

UserStore.all = function() {
  return _users.slice();
};

UserStore.__onDispatch = function(payload) {
  switch(payload.actionType) {
    case "SET_USER":
      resetUser(payload.user);
      UserStore.__emitChange();
      break;
    case "USERS_RECEIVED":
      resetUsers(payload.users);
      UserStore.__emitChange();
      break;
    case "USER_RECEIVED":
      receiveUser(payload.user)
      UserStore.__emitChange();
      break;
  }
}

module.exports = UserStore;
