'use strict';

var MAX_ADS = 5;

var map = document.querySelector('.map');
var mainPin = document.querySelector('.map__pin--main');
var adForm = document.querySelector('.ad-form');
var adFormHeader = document.querySelector('.ad-form-header');
var adFormElement = document.querySelectorAll('.ad-form__element');
var mapFilters = document.querySelector('.map__filters');
// var mapPins = document.querySelectorAll('.map__pin');
var errorTemplate = document.querySelector('#error').content.querySelector('.error');
var successTemplate = document.querySelector('#success').content.querySelector('.success');
var resetFormButton = document.querySelector('.ad-form__reset');

var disablePage = function () {
  var mapPins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
  mapPins.forEach(function(item) {
    item.remove();
  });
  map.classList.add('map--faded');
  adForm.reset();
  adForm.classList.add('ad-form--disabled');
  mapFilters.disabled = true;
  adFormHeader.disabled = true;
  adFormElement.forEach(function (item) {
    item.disabled = true;
  });
  mainPin.addEventListener('mousedown', activatePage);
  mainPin.addEventListener('keydown', activatePage);
};

resetFormButton.addEventListener('click', function() {
  adForm.reset();
})

adForm.addEventListener('submit', function (evt) {
  evt.preventDefault();
  window.upload(new FormData(adForm),
    function (response) {
      var successElement = successTemplate.cloneNode(true);
      map.appendChild(successElement);
      document.addEventListener('keydown', function () {
        window.util.isEscEvent(evt, successElement.remove());
      });
      document.addEventListener('click', function () {
        window.utilisLeftMouseButton(evt, successElement.remove());
      });
    },
    function () {
      var errorElement = errorTemplate.cloneNode(true);
      var errorButton = errorElement.querySelector('.error__button');
      map.appendChild(errorElement);
      document.addEventListener('keydown', function () {
        window.util.isEscEvent(evt, errorElement.remove());
      });
      document.addEventListener('click', function () {
        window.util.isLeftMouseButton(evt, errorElement.remove());
      });
      errorButton.addEventListener('click', function () {
        errorElement.remove();
      });
    });
  disablePage();
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

disablePage();
