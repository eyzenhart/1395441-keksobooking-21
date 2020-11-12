'use strict';

(function () {

  var filterForm = document.querySelector('.map__filters');

  filterForm.addEventListener('change', function (evt) {
    var mapPins = document.querySelectorAll('.map__pin');

    mapPins.forEach(function(item) {
      item.remove();
    });

    const sameTypePins = window.fullData.filter(function(pin) {
      var typeRes = true;
      if (evt.target.value !== "any") {
        typeRes = pin.offer.type === evt.target.value;
      }
      return typeRes;
    });
    var createdSameTypePins = window.pin.createPinElements(sameTypePins.slice(0, 4));
    window.pin.renderPins(createdSameTypePins);
  });
})();
