// gallery.js (generic version)
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.gallery-container').forEach(container => {
      const images = JSON.parse(container.dataset.images);
      const caption = container.querySelector('.gallery-caption');
      const imgElement = container.querySelector('.gallery-img');
      const prevBtn = container.querySelector('.gallery-prev');
      const nextBtn = container.querySelector('.gallery-next');
      
      let currentIndex = 0;
      
      prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        updateGallery();
      });
  
      nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % images.length;
        updateGallery();
      });
  
      function updateGallery() {
        imgElement.src = images[currentIndex].src;
        imgElement.alt = images[currentIndex].caption;
        caption.textContent = images[currentIndex].caption;
      }
  
      // Initialize first image
      updateGallery();
    });
  });
  