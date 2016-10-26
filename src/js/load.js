'use strict';

module.exports = function load(url, callback, callbackName) {
  if (!callbackName) {
    callbackName = '__jsonpCallback' + Date.now();
  }
  window[callbackName] = function(data) {
    callback(data);
  };

  var script = document.createElement('script');
  script.src = url + '?callback=' + callbackName;
  document.body.appendChild(script);
};
