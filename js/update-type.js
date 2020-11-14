'use strict';

(function () {

  var filterForm = document.querySelector('.map__filters');
  var priceFilter = filterForm.querySelector('#housing-price');
  var typeFilter = filterForm.querySelector('#housing-type');
  var roomsFilter = filterForm.querySelector('#housing-rooms');
  var guestsFilter = filterForm.querySelector('#housing-guests');


  filterForm.addEventListener('change', function (evt) {
    var mapPins = document.querySelectorAll('.map__pin:not(.map__pin--main)');

    mapPins.forEach(function (item) {
      item.remove();
    });

    const sameTypePins = window.fullData.filter(function (pin) {
      var typeRes = true;
      var priceRes = true;
      var roomsRes = true;
      var guestsRes = true;

      if (typeFilter.value !== "any") {
        typeRes = pin.offer.type === typeFilter.value;
      };

      if (priceFilter.value !== "any") {
        priceRes = pin.offer.price === priceFilter.value;
        switch(priceFilter.value) {
          case 'low':
            priceRes = pin.offer.price < 10000;
            break;
          case 'high':
            priceRes = pin.offer.price > 50000;
            break;
          case 'middle':
            priceRes = pin.offer.price > 50000;
            break;
        };
      };

      if (roomsFilter.value !== "any") {
        roomsRes = pin.offer.rooms === Number(roomsFilter.value);
      };

      if (guestsFilter.value !== "any") {
        guestsRes = pin.offer.guests === Number(guestsFilter.value);
      };

      return typeRes && priceRes && roomsRes && guestsRes;
    });

    var createdSameTypePins = window.pin.createPinElements(sameTypePins.slice(0, 4));
    window.debounce(window.pin.renderPins(createdSameTypePins));
  });
})();

