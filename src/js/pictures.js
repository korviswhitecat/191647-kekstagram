'use strict';

var load = require('./load');
var getPictureElement = require('./picture');
var gallery = require('./gallery');

module.exports = function() {
  var picturesContainer = document.querySelector('.pictures');
  var filters = document.querySelector('.filters');
  var IMAGE_LOAD_URL = 'http://localhost:1507/api/pictures';

  var renderPictures = function(render) {

    gallery.setPictures(render);

    filters.classList.add('hidden');
    render.forEach(function(picture, index) {
      picturesContainer.appendChild(getPictureElement(picture, index));
    });

    filters.classList.remove('hidden');
  };

  load(IMAGE_LOAD_URL, renderPictures);
};
