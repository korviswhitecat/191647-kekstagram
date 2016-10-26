'use strict';

module.exports = function renderPictures(render) {

  var load = require('./load');
  var getPictureElement = require('./picture');

  var picturesContainer = document.querySelector('.pictures');
  var filters = document.querySelector('.filters');
  var IMAGE_LOAD_URL = 'http://localhost:1507/api/pictures';

  filters.classList.add('hidden');
  render.forEach(function(picture) {
    picturesContainer.appendChild(getPictureElement(picture));
  });

  filters.classList.remove('hidden');
  load(IMAGE_LOAD_URL, renderPictures);
};
