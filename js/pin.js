'use strict';

(function () {
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  window.pin = {

    createPinElements: function (data) {
      var pinElements = [];
      for (var i = 0; i < data.length; i++) {
        var pinElement = pinTemplate.cloneNode(true);
        pinElement.style = 'left: ' + data[i].location.x + 'px; top: ' + data[i].location.y + 'px;';
        pinElement.querySelector('img').src = data[i].author.avatar;
        pinElements.push(pinElement);
      };
      return pinElements;
    },

    renderPins: function (list) {
      var fragment = document.createDocumentFragment();
      list.forEach(function (item) {
        fragment.appendChild(item);
      });
      map.appendChild(fragment);
    }
  };
})();
