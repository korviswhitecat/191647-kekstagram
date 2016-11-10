'use strict';

var load = require('./load');
var Picture = require('./picture');
var gallery = require('./gallery');

module.exports = function() {
  var picturesContainer = document.querySelector('.pictures');
  var filters = document.querySelector('.filters');
  // var footer = document.querySelector('.footer');

  var THROTTLE_TIMEOUT = 100;
  var PAGE_SIZE = 12;
  var IMAGE_LOAD_URL = 'http://localhost:1507/api/pictures';
  var pageNumber = 0;
  var activeFilter = 'filter-popular';

  var params = {
    from: pageNumber * PAGE_SIZE,
    to: pageNumber * PAGE_SIZE + PAGE_SIZE,
    filter: activeFilter
  };

  var renderPictures = function(render) {
    gallery.setPictures(render);

    picturesContainer.innerHTML = '';

    filters.classList.add('hidden');
    render.forEach(function(picture, index) {
      picturesContainer.appendChild(new Picture(picture, index).element);
    });

    // if (picturesContainer.getBoundingClientRect().height - 120 < window.innerHeight - footer.getBoundingClientRect().height) {
    //   pageNumber++;
    //   setFilterProperties();
    //   // reLoad();
    // }

    filters.classList.remove('hidden');
  };


  var isBottomReached = function() {
    var GAP = 100;
    var footerElement = document.querySelector('footer');
    var footerPosition = footerElement.getBoundingClientRect();
    return footerPosition.top - window.innerHeight - GAP <= 0;
  };

  var setFilterProperties = function() {
    params.from = 0;
    params.to = pageNumber * PAGE_SIZE + PAGE_SIZE;
  };

  var isNextPageAvailable = function(data, page, pageSize) {
    return page < Math.floor(data.length / pageSize);
  };

  var reLoad = function() {
    load(IMAGE_LOAD_URL, params, function(data) {
      renderPictures(data);
      if (isBottomReached() && isNextPageAvailable(data, pageNumber, PAGE_SIZE)) {
        pageNumber++;
        setFilterProperties();
        reLoad();
      }
    });
  };

  var setFiltersEnabled = function() {
    filters.addEventListener('change', function(evt) {
      if (evt.target.name === 'filter') {
        picturesContainer.innerHTML = '';
        pageNumber = 0;
        setFilterProperties();
        params.filter = evt.target.id;
        reLoad();
      }
    });
  };

  var setScrollEnabled = function() {
    var lastCall = Date.now();

    window.addEventListener('scroll', function() {
      if (Date.now() - lastCall >= THROTTLE_TIMEOUT) {
        if (isBottomReached() && isNextPageAvailable(data, pageNumber, PAGE_SIZE)) {
          load(IMAGE_LOAD_URL, params, renderPictures);
          pageNumber++;
          setFilterProperties();
          lastCall = Date.now();

        }
      }
    });
  };

  reLoad();
  setFiltersEnabled();
  setScrollEnabled();

};
