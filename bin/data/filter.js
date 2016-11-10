'use strict';

module.exports = function(list, filterID) {
  switch (filterID) {
    case 'filter-popular' :
          return list.sort(function(a, b) {
      return b.likes - a.likes;
    });
    break;

    case 'filter-new' :
      list.sort(function(a, b) {
        return b.created - a.created;
      });
      return list = list.filter(function(date) {
        return date.created > list[0].created - 1000 * 60 * 60 * 24 * 3;
      });
      break;


    case 'filter-discussed' :
      return list.sort(function(a, b) {
        return b.comments - a.comments;
      });
      break;
    }

  return list;
};
