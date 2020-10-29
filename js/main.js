'use strict';

var MAX_ADS = 8;

var map = document.querySelector('.map');
var mapPins = document.querySelector('.map__pins');
var mainPin = document.querySelector('.map__pin--main');
var adForm = document.querySelector('.ad-form');
var adFormHeader = document.querySelector('.ad-form-header');
var adFormElement = document.querySelectorAll('.ad-form__element');
var mapFilters = document.querySelector('.map__filters');
var adFormSubmitButton = document.querySelector('.ad-form__submit');

var adsData = window.card.createAdsData(MAX_ADS);
var cardShowed = window.card.createAdElements(adsData[0]);
var pinsElements = window.pin.createPinElements(adsData);


adForm.classList.add('ad-form--disabled');
mapFilters.disabled = true;
adFormHeader.disabled = true;
adFormElement.forEach(function(item) {
  item.disabled = true;
});


mainPin.addEventListener('mousedown', function(evt) {
  window.util.isLeftMouseButton(evt, removeDisability);
  window.card.renderCard(cardShowed);
  window.pin.renderPins(pinsElements);
  window.info.getAddress();
});


mainPin.addEventListener('keydown', function(evt) {
  window.util.isEnterEvent(evt, removeDisability);
  window.card.renderCard(cardShowed);
  window.pin.renderPins(pinsElements);
  window.info.getAddress();
});


var removeDisability = function() {
  map.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');
  mapFilters.disabled = false;
  adFormHeader.disabled = false;
  adFormElement.forEach(function(item) {
    item.disabled = false;
  });
};

