'use strict';

var MAX_ADS = 5;

var map = document.querySelector('.map');
var mainPin = document.querySelector('.map__pin--main');
var adForm = document.querySelector('.ad-form');
var adFormHeader = document.querySelector('.ad-form-header');
var adFormElement = document.querySelectorAll('.ad-form__element');
var mapFilters = document.querySelector('.map__filters');


adForm.classList.add('ad-form--disabled');
mapFilters.disabled = true;
adFormHeader.disabled = true;
adFormElement.forEach(function (item) {
  item.disabled = true;
});


var activatePage = function (evt) {
  window.util.isLeftMouseButton(evt, function () {
    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    mapFilters.disabled = false;
    adFormHeader.disabled = false;
    adFormElement.forEach(function (item) {
      item.disabled = false;
    });
  });

  window.load(function (list) {
    window.fullData = list;
    window.uploadedData = list.slice(0, MAX_ADS);
    var pinElements = window.pin.createPinElements(window.uploadedData);
    window.pin.renderPins(pinElements);
  }, function () {});
  window.info.getAddress();
  mainPin.removeEventListener('mousedown', activatePage);
};


mainPin.addEventListener('mousedown', activatePage);

mainPin.addEventListener('keydown', activatePage);


