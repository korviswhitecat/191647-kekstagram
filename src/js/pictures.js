'use strict';

var getPictureElement = function(picture) {
  var template = document.querySelector('template');
  var templateContainer = 'content' in template ? template.content : template;
  var pictureElement = templateContainer.querySelector('.picture').cloneNode(true);
  var img = pictureElement.querySelector('img');
  var elementImage = new Image();
  var imageLoadTimeout = null;
  var IMAGE_LOAD_TIMEOUT = 10000;

  pictureElement.querySelector('.picture-comments').textContent = picture.comments;
  pictureElement.querySelector('.picture-likes').textContent = picture.likes;
  elementImage.src = picture.url;

  imageLoadTimeout = setTimeout(function() {
    elementImage.classList.add('picture-load-failure');
    elementImage.width = 182;
    elementImage.height = 182;
  }, IMAGE_LOAD_TIMEOUT);

  elementImage.onload = function(evt) {
    clearTimeout(imageLoadTimeout);
    img.src = evt.target.src;
    elementImage.width = 182;
    elementImage.height = 182;
  };

  elementImage.onerror = function() {
    pictureElement.classList.add('picture-load-failure');
    elementImage.width = 182;
    elementImage.height = 182;
  };

  return pictureElement;
};

var renderPictures = function(render) {
  var picturesContainer = document.querySelector('.pictures');
  var filters = document.querySelector('.filters');
  filters.classList.add('hidden');
  render.forEach(function(picture) {
    picturesContainer.appendChild(getPictureElement(picture));
  });

  filters.classList.remove('hidden');
};

var load = function(url, callback, callbackName) {
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

var IMAGE_LOAD_URL = 'http://localhost:1507/api/pictures';

load(IMAGE_LOAD_URL, renderPictures);
