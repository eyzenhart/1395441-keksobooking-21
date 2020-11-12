'use strict';

(function () {
  var HORIZONTAL_PIN = 10;
  var VERTICAL_PIN = 20;

  var mainPinAddress = document.querySelector('#address');
  // var mainPin = document.querySelector('.map__pin--main');


  // var getRandomIntOnInterval = function (min, max) {
  //   min = Math.ceil(min);
  //   max = Math.floor(max);
  //   return Math.floor(Math.random() * (max - min)) + min;
  // };


  var getRandomInt = function (max) {
    return Math.floor(Math.random() * Math.floor(max));
  };


  window.info = {
    getAddress: function () {
      mainPinAddress.disabled = true;
      var addressLeft = window.mainPin.style.left;
      var addressTop = window.mainPin.style.top;
      var x = 'px';
      var rExp = new RegExp(x, "g");
      mainPinAddress.value = Number(addressLeft.replace(rExp, '')) + HORIZONTAL_PIN + ', ' + (Number(addressTop.replace(rExp, '')) + Number(VERTICAL_PIN));
    },

    getQuantity: function (arr) {
      for (var i = 0; i < arr.length; i++) {
        var start = getRandomInt(arr.length);
        var end = getRandomInt(arr.length);
        if (end > start) {
          var quantity = arr.slice(start, end);
          break;
        }
      }
      return quantity;
    },

    getPhotos: function (arr) {
      var photoFragment = document.createDocumentFragment();
      arr.forEach(function (item) {
        var photo = document.createElement('img');
        photo.src = item;
        photo.classList.add('popup__photo');
        photo.width = 45;
        photo.height = 40;
        photo.alt = "Фотография жилья";
        photoFragment.appendChild(photo);
      });
      return photoFragment;
    },

    getFeatures: function (data) {
      var featuresFragment = document.createDocumentFragment();
      data.offer.features.forEach(function(item) {
        var feature = document.createElement('li');
        feature.classList.add('popup__feature', 'popup__feature--' + item);
        featuresFragment.appendChild(feature);
      });
      return featuresFragment;
    }
  };
})();
