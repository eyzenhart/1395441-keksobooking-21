'use strict';

(function () {

  let newValue;

  var filterForm = document.querySelector('.map__filters');

  filterForm.addEventListener('change', function (evt) {
    var mapPins = document.querySelectorAll('.map__pin');

    mapPins.forEach(function(item) {
      item.remove();
    });


    const sameTypePins = window.fullData.filter(function(pin) {
      // newValue = evt.target.value;
      typeRes = true;

      if (evt.target.value !=="any") {
        var typeRes = pin.offer.type === evt.target.value;
      }
      return typeRes;
    });
    console.log(sameTypePins);
    var createdSameTypePins = window.pin.createPinElements(sameTypePins);
    window.pin.renderPins(createdSameTypePins);
  });
})();
