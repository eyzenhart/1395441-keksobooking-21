'use strict';

var MAX_ADS = 8;

var map = document.querySelector('.map');
var mapPins = document.querySelector('.map__pins');
var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var mainPin = document.querySelector('.map__pin--main');
var adForm = document.querySelector('.ad-form');
var adFormHeader = document.querySelector('.ad-form-header');
var adFormElement = document.querySelectorAll('.ad-form__element');
var mapFilters = document.querySelector('.map__filters');
var mainPinAddress = document.querySelector('#address');
var adFormSubmitButton = document.querySelector('.ad-form__submit');

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

var adRooms = document.querySelector('#room_number');
var adGuests = document.querySelector('#capacity');

var adType = document.querySelector('#type');
var adPrice = document.querySelector('#price');

var adTimeIn = document.querySelector('#timein');
var adTimeOut = document.querySelector('#timeout');


adForm.classList.add('ad-form--disabled');
mapFilters.setAttribute('disabled', 'disabled');
adFormHeader.setAttribute('disabled', 'disabled');
adFormElement.forEach(function(item) {
  item.setAttribute('disabled', 'disabled');
});



mainPin.addEventListener('mousedown', function(evt) {
  if (evt.button === 0) {
    removeDisability();
    renderCard(card);
    renderPins(pinsElements);
    getAddress(adsData[0]);
  }
});


mainPin.addEventListener('keydown', function(evt) {
  if (evt.key === 'Enter') {
    removeDisability();
    renderCard(card);
    renderPins(pinsElements);
  }
});


var handlerGuestsCheck = function(event) {
  for (var i = 0; i < adGuests.length; i++) {
    if (event.target.value === '100') {
      adGuests.options[0].disabled = true;
      adGuests.options[1].disabled = true;
      adGuests.options[2].disabled = true;

      adGuests.options[3].disabled = false;
    }
    else if (event.target.value === '1') {
      adGuests.options[0].disabled = true;
      adGuests.options[1].disabled = true;
      adGuests.options[3].disabled = true;

      adGuests.options[2].disabled = false;
    }
    else if (event.target.value === '2') {
      adGuests.options[0].disabled = true;
      adGuests.options[3].disabled = true;

      adGuests.options[1].disabled = false;
      adGuests.options[2].disabled = false;
    }
    else if (event.target.value === '3') {
      adGuests.options[3].disabled = true;

      adGuests.options[0].disabled = false;
      adGuests.options[1].disabled = false;
      adGuests.options[2].disabled = false;
    }
  }
};

var handlerPriceCheck = function() {
  if (adType.value === 'bungalow') {
    adPrice.placeholder = '0';
  }
  else if (adType.value === 'flat') {
    adPrice.placeholder = '1000';
    adPrice.min = 1000;
  }
  else if (adType.value === 'house') {
    adPrice.placeholder = '5000';
    adPrice.min = 5000;
  }
  else if (adType.value === 'palace') {
    adPrice.placeholder = '10000';
    adPrice.min = 10000;
  }
};

var handlerTimeCheck = function(event) {
  for (var i = 0; i < adTimeOut.length; i++) {
    if (event.target.value === '12:00') {
      adTimeOut.options[1].disabled = true;
      adTimeOut.options[2].disabled = true;

      adTimeOut.options[0].disabled = false;
    }
    else if (event.target.value === '13:00') {
      adTimeOut.options[0].disabled = true;
      adTimeOut.options[2].disabled = true;

      adTimeOut.options[1].disabled = false;
    }
    else if (event.target.value === '14:00') {
      adTimeOut.options[0].disabled = true;
      adTimeOut.options[1].disabled = true;

      adTimeOut.options[2].disabled = false;
    }
  }
};

adTimeIn.addEventListener('change', handlerTimeCheck, false);

adType.addEventListener('change', handlerPriceCheck, false);

adRooms.addEventListener('change', handlerGuestsCheck, false);


var removeDisability = function() {
  map.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');
  mapFilters.removeAttribute('disabled', 'disabled');
  adFormHeader.removeAttribute('disabled', 'disabled');
  adFormElement.forEach(function(item) {
    item.removeAttribute('disabled', 'disabled');
  });
};


var getAddress = function(data) {
  mainPinAddress.setAttribute('value', data.offer.address);
};


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
        address: '(' + getRandomIntOnInterval(200, 1200) + ', ' + getRandomIntOnInterval(130, 630) + ')',
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
        x: getRandomIntOnInterval(200, 1200),
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
    adElement.querySelector('.popup__avatar').src = data.author.avatar;
    adElement.querySelector('.popup__title').textContent = data.offer.title;
    adElement.querySelector('.popup__text--address').textContent = data.offer.address;
    adElement.querySelector('.popup__text--price').textContent = data.offer.price;
    adElement.querySelector('.popup__type').textContent = data.offer.type;
    adElement.querySelector('.popup__text--capacity').textContent = data.offer.rooms + ' комнаты для ' + data.offer.guests + ' гостей';
    adElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + data.offer.checkin + ', выезд до ' + data.offer.checkout;
    adElement.querySelector('.popup__feature').textContent = data.offer.features;
    adElement.querySelector('.popup__description').textContent = data.offer.description;
    adElement.querySelector('.popup__photos').appendChild(getPhotos(photos)); //хрень
    return adElement;
};


var card = createAdElements(adsData[0]);


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


var renderCard = function(item) {
  map.appendChild(item);
};

var pinsElements = createPinElements(adsData);


var renderPins = function(list) {
  var fragment = document.createDocumentFragment();
  list.forEach(function(item) {
    fragment.appendChild(item);
  });
  map.appendChild(fragment);
};
