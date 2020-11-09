'use strict';

var MAX_ADS = 8;

var map = document.querySelector('.map');
// var mapPins = document.querySelector('.map__pins');
var mainPin = document.querySelector('.map__pin--main');
var adForm = document.querySelector('.ad-form');
var adFormHeader = document.querySelector('.ad-form-header');
var adFormElement = document.querySelectorAll('.ad-form__element');
var mapFilters = document.querySelector('.map__filters');
// var adFormSubmitButton = document.querySelector('.ad-form__submit');


adForm.classList.add('ad-form--disabled');
mapFilters.disabled = true;
adFormHeader.disabled = true;
adFormElement.forEach(function (item) {
  item.disabled = true;
});


mainPin.addEventListener('mousedown', function (evt) {
  window.util.isLeftMouseButton(evt, removeDisability);
  window.load(function (list) {
    var pinElements = window.pin.createPinElements(list);
    window.pin.renderPins(pinElements);
  }, function() {});
  window.info.getAddress();
});


mainPin.addEventListener('keydown', function (evt) {
  window.util.isEnterEvent(evt, removeDisability);
  window.load(function (list) {
    var pinElements = window.pin.createPinElements(list);
    window.pin.renderPins(pinElements);
  }, function() {});
  window.info.getAddress();
});


var removeDisability = function () {
  map.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');
  mapFilters.disabled = false;
  adFormHeader.disabled = false;
  adFormElement.forEach(function (item) {
    item.disabled = false;
  });
};

