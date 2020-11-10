'use strict';

// var MAX_ADS = 8;

var map = document.querySelector('.map');
// var mapPins = document.querySelector('.map__pins');
var mainPin = document.querySelector('.map__pin--main');
var adForm = document.querySelector('.ad-form');
var adFormHeader = document.querySelector('.ad-form-header');
var adFormElement = document.querySelectorAll('.ad-form__element');
var mapFilters = document.querySelector('.map__filters');
// var adFormSubmitButton = document.querySelector('.ad-form__submit');

// var typeFilter = document.querySelector('#housing-type');


adForm.classList.add('ad-form--disabled');
mapFilters.disabled = true;
adFormHeader.disabled = true;
adFormElement.forEach(function (item) {
  item.disabled = true;
});

// let newValue;

// var pins = [];

var showInfo = function (evt) {
  window.util.isLeftMouseButton(evt, removeDisability);
  window.load(function (list) {
    window.fullData = list;
    window.uploadedData = list.slice(0, 5);
    var pinElements = window.pin.createPinElements(window.uploadedData);
    window.pin.renderPins(pinElements);
  }, function () {});
  window.info.getAddress();
  mainPin.removeEventListener('mousedown', showInfo);
};

mainPin.addEventListener('mousedown', showInfo);




// var updatePins = function (pins) {

//   const sameTypePins = pins.filter(function(pin) {
//     return pin.offer.type === newValue;
//   });
//     window.pin.renderPins(sameTypePins);
//   };


// typeFilter.addEventListener('change', function () {
//   newValue = this.value;
//   console.log(newValue);
//   updatePins(pins);
// });

// var getSimilarPins = function (data) {
//   window.load(function (list) {
//     var pins = [];
//     list.forEach(function (item) {
//       if (item.offer.value === newValue) {
//         pins.appendChild(pins);
//       }
//     }
//     return pins;
//   }, function() {});
//   var pinElements = window.pin.createPinElements(pins);
//   console.log(pins);
//   if (data.offer.type === newValue) {
//     window.pin.renderPins(pinElements);
//   }
// };

mainPin.addEventListener('keydown', function (evt) {
  window.util.isEnterEvent(evt, removeDisability);
  window.load(function (list) {
    var pinElements = window.pin.createPinElements(list);
    window.pin.renderPins(pinElements);
  }, function () {});
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

