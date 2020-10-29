'use strict';

(function () {
  var ESCAPE = 'Escape';
  var ENTER = 'Enter';

  window.util = {

  isEscEvent: function (evt, action) {
    if (evt.key === ESCAPE) {
      action();
    }
  },

  isEnterEvent: function (evt, action) {
    if (evt.key === ENTER) {
      action();
    }
  },

  isLeftMouseButton: function(evt, action) {
    if (evt.button === 0) {
      action();
    }
  }
};
})();

