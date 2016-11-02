'use strict';

module.exports = function getPictureElement(picture, index) {

  var gallery = require('./gallery');
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

  pictureElement.onclick = function(evt) {
    evt.preventDefault();

    if(!this.classList.contains('picture-load-failure')) {
      gallery.show(index);
    }
  };

  return pictureElement;
};
