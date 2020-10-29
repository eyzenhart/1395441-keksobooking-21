'use strict';

(function() {
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  window.pin = {
    createPinElements: function(data) {
      var pinElements = [];
      data.forEach(function (item) {
        var pinElement = pinTemplate.cloneNode(true);
        pinElement.style = 'left: ' + item.location.x +'px; top: ' + item.location.y + 'px;';
        pinElement.querySelector('img').src = item.author.avatar;
        pinElements.push(pinElement);
      });
      return pinElements;
    },

    renderPins: function(list) {
      var fragment = document.createDocumentFragment();
      list.forEach(function(item) {
        fragment.appendChild(item);
      });
      map.appendChild(fragment);
    }
  }
})();