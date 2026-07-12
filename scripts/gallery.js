// gallery.js (generic version, with tap-to-enlarge lightbox)
document.addEventListener('DOMContentLoaded', () => {
  const containers = document.querySelectorAll('.gallery-container');
  if (!containers.length) return;

  // Shared lightbox, injected once and reused by every gallery on the page.
  const lightbox = document.createElement('div');
  lightbox.className = 'lightbox';
  lightbox.innerHTML = `
    <button class="lightbox-close" aria-label="Close">&times;</button>
    <button class="lightbox-prev" aria-label="Previous image">&#8592;</button>
    <img class="lightbox-img" src="" alt="">
    <button class="lightbox-next" aria-label="Next image">&#8594;</button>
    <p class="lightbox-caption"></p>
  `;
  document.body.appendChild(lightbox);

  const lightboxImg = lightbox.querySelector('.lightbox-img');
  const lightboxCaption = lightbox.querySelector('.lightbox-caption');
  const lightboxPrev = lightbox.querySelector('.lightbox-prev');
  const lightboxNext = lightbox.querySelector('.lightbox-next');
  const lightboxClose = lightbox.querySelector('.lightbox-close');

  let activeGallery = null;

  function openLightbox(gallery) {
    activeGallery = gallery;
    gallery.syncLightbox();
    lightbox.classList.add('open');
    document.body.classList.add('lightbox-locked');
  }

  function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.classList.remove('lightbox-locked');
    activeGallery = null;
  }

  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  lightboxPrev.addEventListener('click', () => activeGallery && activeGallery.step(-1));
  lightboxNext.addEventListener('click', () => activeGallery && activeGallery.step(1));
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') activeGallery && activeGallery.step(-1);
    if (e.key === 'ArrowRight') activeGallery && activeGallery.step(1);
  });

  containers.forEach(container => {
    const images = JSON.parse(container.dataset.images);
    const caption = container.querySelector('.gallery-caption');
    const imgElement = container.querySelector('.gallery-img');
    const prevBtn = container.querySelector('.gallery-prev');
    const nextBtn = container.querySelector('.gallery-next');
    const viewport = container.querySelector('.gallery-viewport') || container;

    let currentIndex = 0;

    const counter = document.createElement('div');
    counter.className = 'gallery-counter';
    viewport.appendChild(counter);

    const expandHint = document.createElement('button');
    expandHint.className = 'gallery-expand';
    expandHint.type = 'button';
    expandHint.setAttribute('aria-label', 'View full image');
    expandHint.innerHTML = '&#x26F6;';
    viewport.appendChild(expandHint);

    function updateGallery() {
      imgElement.src = images[currentIndex].src;
      imgElement.alt = images[currentIndex].caption;
      caption.textContent = images[currentIndex].caption;
      counter.textContent = `${currentIndex + 1} / ${images.length}`;
      if (activeGallery === gallery) gallery.syncLightbox();
    }

    function step(delta) {
      currentIndex = (currentIndex + delta + images.length) % images.length;
      updateGallery();
    }

    const gallery = {
      step,
      syncLightbox() {
        lightboxImg.src = images[currentIndex].src;
        lightboxImg.alt = images[currentIndex].caption;
        lightboxCaption.textContent = images[currentIndex].caption;
      }
    };

    prevBtn.addEventListener('click', () => step(-1));
    nextBtn.addEventListener('click', () => step(1));
    imgElement.addEventListener('click', () => openLightbox(gallery));
    expandHint.addEventListener('click', () => openLightbox(gallery));

    updateGallery();
  });
});
