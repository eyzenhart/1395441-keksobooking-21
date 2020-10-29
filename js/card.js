'use strict';

(function() {
  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
  var map = document.querySelector('.map');
  var HORIZONTAL_MAP_START = 200;
  var HORIZONTAL_MAP_END = 1200;
  var VERTICAL_MAP_START = 130;
  var VERTICAL_MAP_END = 630;
  var MAX_ADS = 8;
  var MAX_GUESTS = 3;
  var MAX_ROOMS = 3;

  var times = ['12:00', '13:00', '14:00'];
  var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var photos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  var type = {
    'palace': 'Дворец',
    'flat': 'Квартира',
    'house': 'Дом',
    'bungalow': 'Бунгало'
  }
  var titles = ['Квартира с футуристичным ремонтом', 'Жилье с прекрасным видом на город!', 'Отличное место для остановки туристов', 'Недорогое жилье для молодой семьи', 'Дом в роскошном районе'];
  var descriptions = ['Очень просторно, есть все что необходимо.', 'Тихий район, хорошо развита инфраструктура.', 'Евро-ремонт, доброжелательные соседи, круглосуточный рядом', 'Для тех, кто привык жить в роскоши', 'Апартаменты высочайшего класса', 'Уютное и доступное жилье в историческом центре города'];


  var getRandomIntOnInterval = function(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  };


  var getRandomInt = function(max) {
    return Math.floor(Math.random() * Math.floor(max));
  };

  window.card = {
    createAdsData: function(number) {
      var ads = [];
      for (var i = 0; i < number; i++) {
        var ad = {
          author: {
            avatar: 'img/avatars/user' + '0' + (i + 1) + '.png'
          },
          offer: {
            title: titles[getRandomInt(titles.length)],
            address: getRandomIntOnInterval(HORIZONTAL_MAP_START, HORIZONTAL_MAP_END) + ', ' + getRandomIntOnInterval(VERTICAL_MAP_START, VERTICAL_MAP_END),
            price: getRandomInt(10000),
            type: window.info.getType(type),
            rooms: getRandomIntOnInterval(1, MAX_ROOMS),
            guests: getRandomIntOnInterval(1, MAX_GUESTS),
            checkin: times[getRandomInt(times.length)],
            checkout: times[getRandomInt(times.length)],
            features: window.info.getQuantity(features),
            description: descriptions[getRandomInt(descriptions.length)],
            photos: window.info.getPhotos(photos)
          },
          location: {
            x: getRandomIntOnInterval(HORIZONTAL_MAP_START, HORIZONTAL_MAP_END),
            y: getRandomIntOnInterval(VERTICAL_MAP_START, VERTICAL_MAP_END)
          }
        };
        ads.push(ad);
      }
      return ads;
    },

    createAdElements: function(data) {
        var adElement = cardTemplate.cloneNode(true);
        adElement.querySelector('.popup__avatar').src = data.author.avatar;
        adElement.querySelector('.popup__title').textContent = data.offer.title;
        adElement.querySelector('.popup__text--address').textContent = '(' + data.offer.address + ')';
        adElement.querySelector('.popup__text--price').textContent = data.offer.price;
        adElement.querySelector('.popup__type').textContent = data.offer.type;
        adElement.querySelector('.popup__text--capacity').textContent = data.offer.rooms + ' комнаты для ' + data.offer.guests + ' гостей';
        adElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + data.offer.checkin + ', выезд до ' + data.offer.checkout;
        adElement.querySelector('.popup__feature').textContent = data.offer.features;
        adElement.querySelector('.popup__description').textContent = data.offer.description;
        adElement.querySelector('.popup__photos').appendChild(window.info.getPhotos(photos)); //хрень
        return adElement;
    },

    renderCard: function(item) {
      map.appendChild(item);
    }
  };
})();
