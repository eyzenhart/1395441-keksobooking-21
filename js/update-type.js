'use strict';

(function () {
  // var mapPins = document.querySelectorAll('.map__pin');
  var map = document.querySelector('.map');

  // console.log(mapPins);
  let newValue;

  var filterForm = document.querySelector('.map__filters');

  filterForm.addEventListener('change', function (evt) {
    var mapPins = document.querySelectorAll('.map__pin');

    mapPins.forEach(function(item) {
      item.remove();
    });

    newValue = evt.target.value;

    const sameTypePins = window.fullData.filter(function(pin) {
      return pin.offer.type === newValue;
    });
    console.log(sameTypePins);
    var createdSameTypePins = window.pin.createPinElements(sameTypePins);
    window.pin.renderPins(createdSameTypePins);
  });
})();