'use strict';

(function () {

  var Key = {
    ESCAPE: 'Escape',
    ENTER: 'Enter'
  };


  window.util = {

    isEscEvent: function (evt, action) {
      if (evt.key === Key.ESCAPE) {
        action();
      }
    },

    isEnterEvent: function (evt, action) {
      if (evt.key === Key.ENTER) {
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

