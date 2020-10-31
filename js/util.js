'use strict';

(function () {

  var key = {
    ESCAPE: 'Escape',
    ENTER: 'Enter'
  }


  window.util = {

    isEscEvent: function (evt, action) {
      if (evt.key === key.ESCAPE) {
        action();
      }
    },

    isEnterEvent: function (evt, action) {
      if (evt.key === key.ENTER) {
        action();
      }
    },

    isLeftMouseButton: function (evt, action) {
      if (evt.button === 0) {
        action();
      }
    }
  };
})();

