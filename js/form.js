'use strict';

//валидация формы

(function() {
  var adRooms = document.querySelector('#room_number');
  var adGuests = document.querySelector('#capacity');
  var adType = document.querySelector('#type');
  var adPrice = document.querySelector('#price');

  var NOT_FOR_GUESTS_INDEX = 3;
  var prices = {
    'bungalow': 0,
    'flat': 1000,
    'house': 5000,
    'palace': 10000
  };

  var adTimeIn = document.querySelector('#timein');
  var adTimeOut = document.querySelector('#timeout');

  window.form = {
    guestsCheckHandler: function(event) {
      var rooms = event.target.value;
      var guests = Array.prototype.slice.call(adGuests.options);

      guests.forEach(function(item, index) {
        if (index < rooms && rooms != '100') {
          item.disabled = false;
        }
        else {
          item.disabled = true;
        }
        if (rooms === '100') {
          guests[NOT_FOR_GUESTS_INDEX].disabled = false;
        }
      });
    },

    priceCheckHandler: function(event) {
      adPrice.placeholder = prices[event.target.value];
      adPrice.min = prices[event.target.value];
    },

    timeCheckHandler: function() {
      adTimeOut.options[this.selectedIndex].selected = true;
      adTimeIn.options[this.selectedIndex].selected = true;
    }
  }

  adTimeIn.addEventListener('change', window.form.timeCheckHandler);
  adTimeOut.addEventListener('change', window.form.timeCheckHandler);
  adType.addEventListener('change', window.form.priceCheckHandler);
  adRooms.addEventListener('change', window.form.guestsCheckHandler);
})();







