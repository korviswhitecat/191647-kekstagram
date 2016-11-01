'use strict';

module.exports = function() {
  var load = require('./load');
  var getPictureElement = require('./picture');
  var gallery = require('./gallery');


  var picturesContainer = document.querySelector('.pictures');
  var filters = document.querySelector('.filters');
  var IMAGE_LOAD_URL = 'http://localhost:1507/api/pictures';

  var renderPictures = function(render) {
    filters.classList.add('hidden');
    render.forEach(function(picture) {
      picturesContainer.appendChild(getPictureElement(picture));
    });

    filters.classList.remove('hidden');
  };

  load(IMAGE_LOAD_URL, renderPictures);
  gallery.setPictures(IMAGE_LOAD_URL, renderPictures);
};
