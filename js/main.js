document.addEventListener('DOMContentLoaded', function () {
  // Mobile nav toggle
  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      var open = links.classList.toggle('open');
      toggle.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        links.classList.remove('open');
        toggle.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Gallery lightbox
  var items = document.querySelectorAll('.gallery-item');
  var lightbox = document.querySelector('.lightbox');
  if (items.length && lightbox) {
    var lbImg = lightbox.querySelector('img');
    var lbTag = lightbox.querySelector('.lightbox-cap .tag');
    var lbTitle = lightbox.querySelector('.lightbox-cap .title');
    var closeBtn = lightbox.querySelector('.lightbox-close');
    var prevBtn = lightbox.querySelector('.lightbox-prev');
    var nextBtn = lightbox.querySelector('.lightbox-next');
    var data = Array.prototype.map.call(items, function (el) {
      return {
        src: el.dataset.full || el.querySelector('img').src,
        tag: el.dataset.tag || '',
        title: el.dataset.title || ''
      };
    });
    var current = 0;

    function show(i) {
      current = (i + data.length) % data.length;
      var d = data[current];
      lbImg.src = d.src;
      lbTag.textContent = d.tag;
      lbTitle.textContent = d.title;
    }
    function open(i) {
      show(i);
      lightbox.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
    function close() {
      lightbox.classList.remove('open');
      document.body.style.overflow = '';
    }

    items.forEach(function (el, i) {
      el.addEventListener('click', function () { open(i); });
    });
    closeBtn.addEventListener('click', close);
    prevBtn.addEventListener('click', function () { show(current - 1); });
    nextBtn.addEventListener('click', function () { show(current + 1); });
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) close();
    });
    document.addEventListener('keydown', function (e) {
      if (!lightbox.classList.contains('open')) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') show(current - 1);
      if (e.key === 'ArrowRight') show(current + 1);
    });
  }
});
