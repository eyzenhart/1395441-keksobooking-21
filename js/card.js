'use strict';

(function () {
  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
  var map = document.querySelector('.map');


  var photos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  // var Type = {
  //   'palace': 'Дворец',
  //   'flat': 'Квартира',
  //   'house': 'Дом',
  //   'bungalow': 'Бунгало'
  // };

  window.card = {
    createAdElements: function (data) {
      var adElement = cardTemplate.cloneNode(true);
      var cardClose = adElement.querySelector('.popup__close');

      adElement.querySelector('.popup__avatar').src = data.author.avatar;
      adElement.querySelector('.popup__title').textContent = data.offer.title;
      adElement.querySelector('.popup__text--address').textContent = '(' + data.offer.address + ')';
      adElement.querySelector('.popup__text--price').textContent = data.offer.price;
      adElement.querySelector('.popup__type').textContent = data.offer.type;
      adElement.querySelector('.popup__text--capacity').textContent = data.offer.rooms + ' комнаты для ' + data.offer.guests + ' гостей';
      adElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + data.offer.checkin + ', выезд до ' + data.offer.checkout;
      adElement.querySelector('.popup__feature').textContent = data.offer.features;
      adElement.querySelector('.popup__description').textContent = data.offer.description;
      adElement.querySelector('.popup__photos').appendChild(window.info.getPhotos(photos));
      cardClose.addEventListener('click', function () {
        adElement.remove();
      });

      document.addEventListener('keydown', function (evt) {
        window.util.isEscEvent(evt, function () {
          adElement.remove();
        })
      });

      return adElement;
    },

    render: function (item) {
      map.appendChild(item);
    }
  };
})();
