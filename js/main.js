'use strict';

var map = document.querySelector('.map');
var mapPins = document.querySelector('.map__pins');
var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

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

var MAX_ADS = 8;

map.classList.remove('map--faded');


var getRandomIntOnInterval = function(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};


var getRandomInt = function(max) {
  return Math.floor(Math.random() * Math.floor(max));
};


var getType = function(list) {
  var typeList = [];
  for (var listItem in list) {
    typeList.push(list[listItem]);
  };
  return typeList[getRandomIntOnInterval(0, typeList.length)];
};


var getFeatures = function(arr) {
  var featureFragment = document.createDocumentFragment();
  arr.forEach(function(item) {
    var newFeature = document.createElement('li');
    newFeature.classList.add('popup__feature', 'popup__feature--' + arr[feature]);
    featureFragment.appendChild(newFeature);
  });
  return featureFragment;
};


var getQuantity = function(arr) {
  for (var i = 0; i < arr.length; i++) {
    var start = getRandomInt(arr.length);
    var end = getRandomInt(arr.length);
    if (end > start) {
        var quantity = arr.slice(start, end);
        break;
      }
  }
  return quantity;
};


var getPhotos = function(arr) {
  var photoFragment = document.createDocumentFragment();
  arr.forEach(function(item) {
    var photo = document.createElement('img');
    photo.src = item;
    photo.classList.add('popup__photo');
    photo.width = 45;
    photo.height = 40;
    photo.alt = "Фотография жилья";
    photoFragment.appendChild(photo);
  });
  return photoFragment;
};


var createAdsData = function(number) {
  var ads = [];
  for (var i = 0; i < number; i++) {
    var ad = {
      author: {
        avatar: 'img/avatars/user' + '0' + (i + 1) + '.png'
      },
      offer: {
        title: titles[getRandomInt(titles.length)],
        address: '(' + getRandomIntOnInterval(0, 1200) + ', ' + getRandomIntOnInterval(130, 630) + ')',
        price: getRandomInt(10000),
        type: getType(type),
        rooms: getRandomIntOnInterval(1, 6),
        guests: getRandomInt(10),
        checkin: times[getRandomInt(times.length)],
        checkout: times[getRandomInt(times.length)],
        features: getQuantity(features),
        description: descriptions[getRandomInt(descriptions.length)],
        photos: getPhotos(photos)
      },
      location: {
        x: getRandomIntOnInterval(0, 1200),
        y: getRandomIntOnInterval(130, 630)
      }
    };
    ads.push(ad);
  }
 return ads;
};


var adsData = createAdsData(MAX_ADS);


var createAdElements = function(data) {
    var adElement = cardTemplate.cloneNode(true);
    adElement.querySelector('.popup__avatar').src = data[0].author.avatar;
    adElement.querySelector('.popup__title').textContent = data[0].offer.title;
    adElement.querySelector('.popup__text--address').textContent = data[0].offer.address;
    adElement.querySelector('.popup__text--price').textContent = data[0].offer.price;
    adElement.querySelector('.popup__type').textContent = data[0].offer.type;
    adElement.querySelector('.popup__text--capacity').textContent = data[0].offer.rooms + ' комнаты для ' + data[0].offer.guests + ' гостей';
    adElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + data[0].offer.checkin + ', выезд до ' + data[0].offer.checkout;
    adElement.querySelector('.popup__feature').textContent = data[0].offer.features;
    adElement.querySelector('.popup__description').textContent = data[0].offer.description;
    adElement.querySelector('.popup__photos').appendChild(getPhotos(photos)); //хрень

    // adElement.querySelector('.popup__photo').src = item.offer.photos;
  return adElement;
};


var createPinElements = function(data) {
  var pinElements = [];
  data.forEach(function (item) {
    var pinElement = pinTemplate.cloneNode(true);
    pinElement.style = 'left: ' + item.location.x +'px; top: ' + item.location.y + 'px;';
    pinElement.querySelector('img').src = item.author.avatar;
    pinElements.push(pinElement);
  });
  return pinElements;
};


var renderCard = function() {
  var adElement = createAdElements(adsData);
  var cardFragment = document.createDocumentFragment();
  cardFragment.appendChild(adElement);
  map.appendChild(cardFragment);
}


var renderPins = function() {
  var adsData = createAdsData(MAX_ADS);
  var pinsElements = createPinElements(adsData);
  var fragment = document.createDocumentFragment();
  pinsElements.forEach(function(item) {
    fragment.appendChild(item);
  });
  map.appendChild(fragment);

}

renderCard();
renderPins();





// var adsElements = createAdElements(adsData);
// var pinsElements = createPinElement(adsData);

// var fragment = document.createDocumentFragment();
// adsElements.forEach(function(item) {
//   fragment.appendChild(item);
// });
// pinsElements.forEach(function(item) {
//   fragment.appendChild(item);
// });

// map.appendChild(fragment);


//renderPins отдельная ф-ия
// отдельно renderCard! одна штука
