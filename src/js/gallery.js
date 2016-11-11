'use strict';

function Gallery() {
  this.pictures = [];
  this.activePicture = 0;
  this.galleryContainer = document.querySelector('.gallery-overlay');
  this.closeElement = this.galleryContainer.querySelector('.gallery-overlay-close');
  this.galleryImage = this.galleryContainer.querySelector('.gallery-overlay-image');

  this.show = this.show.bind(this);
  this.setActivePicture = this.setActivePicture.bind(this);
  this.hide = this.hide.bind(this);

  // this.closeElement = this.closeElement.bind(this);
}

Gallery.prototype = {

  setPictures: function(pictures) {
    this.pictures = pictures;
  },

  hide: function() {
    this.galleryContainer.classList.add('invisible');
    this.closeElement.onclick = null;
    this.galleryImage.onclick = null;
  },

  setActivePicture: function(number) {
    this.activePicture = number;

    this.galleryLikes = this.galleryContainer.querySelector('.likes-count');
    this.galleryComments = this.galleryContainer.querySelector('.comments-count');

    var bigImage = this.pictures[number];

    this.galleryImage.src = bigImage.url;
    this.galleryLikes.textContent = bigImage.likes;
    this.galleryComments.textContent = bigImage.comments;
  },

  show: function(number) {
    // var self = this;
    this.closeElement.onclick = function() {
      this.hide();
    };

    this.galleryImage.onclick = function() {
      if (number < this.pictures.length - 1) {
        this.setActivePicture(++number);
      } else {
        number = 0;
        this.setActivePicture(0);
      }
    };

    this.galleryContainer.classList.remove('invisible');
    this.setActivePicture(number);
  }

};

module.exports = new Gallery();
