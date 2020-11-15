'use strict';

(function () {

  var LOW_PRICE = 10000;
  var HIGHT_PRICE = 50000;

  var filterForm = document.querySelector('.map__filters');
  var priceFilter = filterForm.querySelector('#housing-price');
  var typeFilter = filterForm.querySelector('#housing-type');
  var roomsFilter = filterForm.querySelector('#housing-rooms');
  var guestsFilter = filterForm.querySelector('#housing-guests');

  var filterData = function () {
    var mapPins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    var openedCard = document.querySelector('.map__card');

    if (openedCard) {
      openedCard.remove();
    };

    mapPins.forEach(function (item) {
      item.remove();
    });

    const filteredData = window.fullData.filter(function (pin) {
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
            priceRes = pin.offer.price < LOW_PRICE;
            break;
          case 'high':
            priceRes = pin.offer.price > HIGHT_PRICE;
            break;
          case 'middle':
            priceRes = pin.offer.price < HIGHT_PRICE && pin.offer.price > LOW_PRICE;
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

    var createdSamePins = window.pin.createPinElements(filteredData.slice(0, 4));
    window.pin.renderPins(createdSamePins);
  };

  filterForm.addEventListener('change', window.debounce(filterData));

})();

