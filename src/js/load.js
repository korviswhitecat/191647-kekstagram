'use strict';

var load = function(IMAGE_LOAD_URL, callback) {
  var xhr = new XMLHttpRequest();

  xhr.open('GET', IMAGE_LOAD_URL);

  // xhr.open('GET', IMAGE_LOAD_URL + '?filter=' + params.filter + '&from=' + params.from + '&to=' + params.to);

  xhr.addEventListener('load', function(evt) {
    try {
      var loadedData = JSON.parse(evt.target.response);
      callback(loadedData);
    } catch(error) {
      console.log(error);
    }
  });

  xhr.send();
};

module.exports = load;
