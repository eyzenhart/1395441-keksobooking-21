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
};

adForm.addEventListener('submit', function (evt) {
  console.log(adForm);
  console.log(new FormData(adForm));
  window.upload(new FormData(adForm),
    function (response) {
      var successElement = successTemplate.cloneNode(true);
      map.appendChild(successElement);
      // document.addEventListener('click', function (evt) {
      //   window.util.isLeftMouseButton(evt, successElement.remove());
      // })
    },
    function () {
      var errorElement = errorTemplate.cloneNode(true);
      var errorButton = errorElement.querySelector('.error__button');
      map.appendChild(errorElement);
      errorButton.addEventListener('click', function () {
        errorElement.remove();
      });
    });
  evt.preventDefault();
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

mainPin.addEventListener('mousedown', activatePage);

mainPin.addEventListener('keydown', activatePage);

