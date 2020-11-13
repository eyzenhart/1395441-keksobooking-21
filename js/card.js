'use strict';

(function () {
  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
  var map = document.querySelector('.map');

  var Type = {
    'palace': 'Дворец',
    'flat': 'Квартира',
    'house': 'Дом',
    'bungalow': 'Бунгало'
  };

  window.card = {
    createAdElement: function (data) {
      var openedCard = document.querySelector('.map__card');
      var adElement = cardTemplate.cloneNode(true);
      var cardClose = adElement.querySelector('.popup__close');
      var featuresList = adElement.querySelector('.popup__features');

      if (openedCard) {
        openedCard.remove();
      }

      adElement.querySelector('.popup__avatar').src = data.author.avatar;
      adElement.querySelector('.popup__title').textContent = data.offer.title;
      adElement.querySelector('.popup__text--address').textContent = '(' + data.offer.address + ')';
      adElement.querySelector('.popup__text--price').textContent = data.offer.price;
      adElement.querySelector('.popup__type').textContent = Type[data.offer.type];
      adElement.querySelector('.popup__text--capacity').textContent = data.offer.rooms + ' комнаты для ' + data.offer.guests + ' гостей';
      adElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + data.offer.checkin + ', выезд до ' + data.offer.checkout;
      featuresList.innerHTML = '';
      featuresList.appendChild(window.info.getFeatures(data));

      adElement.querySelector('.popup__description').textContent = data.offer.description;
      adElement.querySelector('.popup__photos').appendChild(window.info.getPhotos(data.offer.photos));

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
