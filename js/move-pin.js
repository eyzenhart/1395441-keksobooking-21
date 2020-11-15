'use strict';

(function () {

  var DRAG_LIMIT = {
    x: {
      min: 0,
      max: 1200
    },
    y: {
      min: 130,
      max: 630
    }
  };

  window.PIN_TIP_HEIGHT = 22;

  var mainPin = document.querySelector('.map__pin--main');


  mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      window.mainPin.style.top = (mainPin.offsetTop - shift.y) + 'px';
      window.mainPin.style.left = (mainPin.offsetLeft - shift.x) + 'px';

      window.info.getAddress();

      if (mainPin.offsetLeft > DRAG_LIMIT.x.max - mainPin.offsetWidth / 2) {
        mainPin.style.left = DRAG_LIMIT.x.max - mainPin.offsetWidth / 2 + 'px';
      } else if (mainPin.offsetLeft < DRAG_LIMIT.x.min - mainPin.offsetWidth / 2) {
        mainPin.style.left = DRAG_LIMIT.x.min - mainPin.offsetWidth / 2 + 'px';
      }

      if (mainPin.offsetTop > DRAG_LIMIT.y.max - mainPin.offsetHeight - window.PIN_TIP_HEIGHT) {
        mainPin.style.top = DRAG_LIMIT.y.max - mainPin.offsetHeight - window.PIN_TIP_HEIGHT + 'px';
      } else if (mainPin.offsetTop < DRAG_LIMIT.y.min - mainPin.offsetHeight - window.PIN_TIP_HEIGHT) {
        mainPin.style.top = DRAG_LIMIT.y.min - mainPin.offsetHeight - window.PIN_TIP_HEIGHT + 'px';
      }
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

})();
