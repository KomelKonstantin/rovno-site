// Студия «Ровно» — скрипты лендинга
// 1. Кнопки «Показать ещё / Свернуть» в услугах и в альбоме работ
// 2. Просмотр фото работ (lightbox): стрелки, Esc, клик по фону

(function () {
  'use strict';

  /* ---------- 1. Раскрытие списков ---------- */

  document.querySelectorAll('.service-more').forEach(function (button) {
    var box = button.classList.contains('works-more')
      ? document.getElementById('works-grid')
      : button.closest('.service-category');
    var moreText = button.textContent;

    button.addEventListener('click', function () {
      var isOpen = box.classList.toggle('is-collapsed') === false;
      button.setAttribute('aria-expanded', isOpen);
      button.textContent = isOpen ? 'Свернуть' : moreText;
    });
  });

  /* ---------- 2. Lightbox ---------- */

  var lightbox = document.getElementById('lb');
  var bigImage = lightbox.querySelector('img');
  var thumbs = Array.prototype.slice.call(document.querySelectorAll('#works-grid button'));
  var current = 0;
  var lastFocused = null;

  function show(index) {
    current = (index + thumbs.length) % thumbs.length;
    var source = thumbs[current].querySelector('img');
    bigImage.src = source.src;
    bigImage.alt = source.alt;
  }

  function open(index) {
    lastFocused = document.activeElement;
    show(index);
    lightbox.hidden = false;
    document.body.style.overflow = 'hidden';
    lightbox.querySelector('.lb-close').focus();
  }

  function close() {
    lightbox.hidden = true;
    document.body.style.overflow = '';
    if (lastFocused) lastFocused.focus();
  }

  thumbs.forEach(function (thumb, index) {
    thumb.addEventListener('click', function () { open(index); });
  });

  lightbox.querySelector('.lb-close').addEventListener('click', close);
  lightbox.querySelector('.lb-prev').addEventListener('click', function () { show(current - 1); });
  lightbox.querySelector('.lb-next').addEventListener('click', function () { show(current + 1); });

  // Клик по тёмному фону вокруг фото закрывает просмотр
  lightbox.addEventListener('click', function (event) {
    if (event.target === lightbox) close();
  });

  document.addEventListener('keydown', function (event) {
    if (lightbox.hidden) return;
    if (event.key === 'Escape') close();
    else if (event.key === 'ArrowLeft') show(current - 1);
    else if (event.key === 'ArrowRight') show(current + 1);
  });
})();
