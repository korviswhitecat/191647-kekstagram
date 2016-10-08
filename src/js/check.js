'use strict';

function getMessage(a, b) {
  if (typeof a === 'boolean') {
    if (a == true) {
      return 'Переданное GIF-изображение анимировано и содержит ' + b + ' кадров';
    }
    else {
      return 'Переданное изображение на анимировано';
    }

  } else if (typeof a === 'number') {
      return 'Переданное SVG-изображение содержит ' + a + ' объектов и ' + b * 4 + ' атрибутов';

  } else if ((typeof a === 'object') && (typeof b == 'object')) {
      if (Array.isArray(a) && Array.isArray(b) && a.length == b.length) {
        var artifactsSquare = 0;

        for (var i = 0, j = 0; i < a.length, j < b.length; i++, j++) {
          artifactsSquare += a[i] * b[j];
        }
        return 'Общая площадь артефактов сжатия: ' + artifactsSquare + ' пикселей';
      }

  } else if (typeof a === 'object') {
      if (Array.isArray(a)) {
        var amountOfRedPoints = 0;

        for (var i = 0; i < a.length; i++) {
          amountOfRedPoints += a[i];
      }
    }
    return 'Количество красных точек во всех строчках изображения: ' + amountOfRedPoints;
  }

  return 'Переданы некорректные данные';
}
