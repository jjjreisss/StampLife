module.exports = {
  stampNewness: function(a, b) {
    if (a.created_at < b.created_at) {
      return 1;
    } else if (a.created_at === b.created_at) {
      return 0;
    } else {
      return -1;
    }
  },

  stampPopularity: function(a, b) {
    if (a.stamp_uses.length < b.stamp_uses.length) {
      return 1;
    } else if (a.stamp_uses.length === b.stamp_uses.length) {
      return 0;
    } else {
      return -1;
    }
  },

  drawingNewness: function(a, b) {
    if (a.created_at < b.created_at) {
      return 1;
    } else if (a.created_at === b.created_at) {
      return 0;
    } else {
      return -1;
    }
  },

  drawingPopularity: function(a, b) {
    if (a.likes.length < b.likes.length) {
      return 1;
    } else if (a.likes.length === b.likes.length) {
      return 0;
    } else {
      return -1;
    }
  },
}
