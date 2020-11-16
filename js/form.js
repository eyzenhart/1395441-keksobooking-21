'use strict';

(function () {
  var oneHundredRooms = '100';
  var adRooms = document.querySelector('#room_number');
  var adGuests = document.querySelector('#capacity');
  var adType = document.querySelector('#type');
  var adPrice = document.querySelector('#price');

  var Prices = {
    'bungalow': 0,
    'flat': 1000,
    'house': 5000,
    'palace': 10000
  };

  var adTimeIn = document.querySelector('#timein');
  var adTimeOut = document.querySelector('#timeout');
  var adHeader = document.querySelector('#title');


  window.form = {
    guestsCheckHandler: function (event) {
      var rooms = event.target.value;
      var guests = Array.prototype.slice.call(adGuests.options);

      guests.forEach(function (item, index) {
        if (index < rooms && rooms !== oneHundredRooms) {
          item.disabled = false;
        } else {
          item.disabled = true;
        }
        if (rooms === oneHundredRooms) {
          guests[guests.length - 1].disabled = false;
        }
      });
    },

    priceCheckHandler: function (event) {
      adPrice.placeholder = Prices[event.target.value];
      adPrice.min = Prices[event.target.value];
    },

    timeCheckHandler: function () {
      adTimeOut.options[this.selectedIndex].selected = true;
      adTimeIn.options[this.selectedIndex].selected = true;
    },

    checkValidity: function (event) {
      if (event.target.validity.tooShort || event.target.validity.tooLong || event.target.validity.valueMissing) {
        event.target.classList.add('invalid-input');
      }
      event.target.removeEventListener('invalid', window.form.checkValidity);
    }
  };

  adTimeIn.addEventListener('change', window.form.timeCheckHandler);
  adTimeOut.addEventListener('change', window.form.timeCheckHandler);
  adType.addEventListener('change', window.form.priceCheckHandler);
  adRooms.addEventListener('change', window.form.guestsCheckHandler);
  adHeader.addEventListener('invalid', window.form.checkValidity);
  adPrice.addEventListener('invalid', window.form.checkValidity);
})();
