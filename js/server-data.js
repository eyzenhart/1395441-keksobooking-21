'use strict';

(function () {

  var Code = {
    SUCCESS: 200,
    WRONG_REQUEST: 400,
    NOT_AUTHORIZED: 401,
    DOESNT_EXIST: 404,
  };

  var JSON_TYPE = 'json';

  var REQUEST_TIMEOUT = 10000;

  var URL = 'https://21.javascript.pages.academy/keksobooking/data';

  window.load = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = JSON_TYPE;

    xhr.addEventListener('load', function () {
      var error;
      switch (xhr.status) {
        case Code.SUCCESS:
          onSuccess(xhr.response);
          break;
        case Code.WRONG_REQUEST:
          error = 'Неверный запрос';
          break;
        case Code.NOT_AUTHORIZED:
          error = 'Пользователь не авторизован';
          break;
        case Code.DOESNT_EXIST:
          error = 'Ничего не найдено';
          break;
        default:
          error = 'Cтатус ответа: : ' + xhr.status + ' ' + xhr.statusText;
      }

      if (error) {
        onError(error);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = REQUEST_TIMEOUT;

    xhr.open('GET', URL);

    xhr.send();
  };

  var sendURL = 'https://21.javascript.pages.academy/keksobooking';

  window.upload = function (data, onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    console.log(xhr.status);

    xhr.responseType = JSON_TYPE;
    xhr.addEventListener('load', function () {

    if (xhr.status === Code.SUCCESS) {
      onSuccess(xhr.response);
    }
    else {
      onError();
    }
  });


  xhr.open('POST', sendURL);
  xhr.send(data);
};
})();
