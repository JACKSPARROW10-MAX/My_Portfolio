/**
 * Photo Carousel Component for Scene 09 (Real Photographs)
 * Handles auto-advancing slideshow with Ken Burns zoom, smooth cross-fades, and manual controls.
 */

export class PhotoCarousel {
  constructor(containerElement) {
    this.container = containerElement;
    this.photos = [];
    this.currentIndex = 0;
    this.timer = null;
    this.isPaused = false;
    this.intervalMs = 4000;
  }

  init(photosList) {
    this.photos = photosList || [];
    this.currentIndex = 0;
    this.renderContainer();
    this.showPhoto(0);
    this.startAutoPlay();
  }

  renderContainer() {
    if (!this.container) return;

    this.container.innerHTML = `
      <div class="photo-carousel-wrapper relative w-full h-full flex items-center justify-center overflow-hidden rounded-2xl border border-white/10 glass-panel">
        <div id="carousel-stage" class="relative w-full h-full flex items-center justify-center"></div>
        <div id="carousel-caption" class="absolute bottom-6 left-1/2 -translate-x-1/2 px-6 py-2 rounded-full glass bg-black/60 text-sm text-neutral-200 tracking-wider"></div>
        
        <!-- Controls overlay -->
        <div class="absolute bottom-6 right-6 flex items-center gap-3 z-20">
          <button id="carousel-prev" class="w-10 h-10 rounded-full glass hover:bg-white/20 flex items-center justify-center text-white transition-all">❮</button>
          <button id="carousel-pause" class="w-10 h-10 rounded-full glass hover:bg-white/20 flex items-center justify-center text-white transition-all">⏸</button>
          <button id="carousel-next" class="w-10 h-10 rounded-full glass hover:bg-white/20 flex items-center justify-center text-white transition-all">❯</button>
        </div>
      </div>
    `;

    document.getElementById("carousel-prev")?.addEventListener("click", () => this.prev());
    document.getElementById("carousel-next")?.addEventListener("click", () => this.next());
    document.getElementById("carousel-pause")?.addEventListener("click", () => this.togglePause());
  }

  showPhoto(index) {
    if (!this.photos.length) return;

    this.currentIndex = (index + this.photos.length) % this.photos.length;
    const photoData = this.photos[this.currentIndex];
    const stage = document.getElementById("carousel-stage");
    const caption = document.getElementById("carousel-caption");

    if (!stage) return;

    const newPhotoEl = document.createElement("div");
    newPhotoEl.className = "absolute inset-0 bg-contain bg-center bg-no-repeat transition-all duration-700 opacity-0 scale-100";
    
    // Set fallback styled photo frame if image file isn't uploaded yet
    newPhotoEl.style.backgroundImage = `url('${photoData.src}'), radial-gradient(circle, #2d3748 0%, #1a202c 100%)`;

    stage.appendChild(newPhotoEl);
    const oldPhotos = Array.from(stage.children).filter(el => el !== newPhotoEl);

    if (caption) {
      caption.textContent = photoData.caption || `Photograph ${this.currentIndex + 1}`;
    }

    if (window.gsap) {
      if (oldPhotos.length) {
        window.gsap.to(oldPhotos, {
          opacity: 0,
          duration: 0.6,
          onComplete: () => oldPhotos.forEach(el => el.remove())
        });
      }

      window.gsap.fromTo(
        newPhotoEl,
        { opacity: 0, scale: 1.05 },
        { opacity: 1, scale: 1, duration: 1, ease: "power2.out" }
      );
    } else {
      oldPhotos.forEach(el => el.remove());
      newPhotoEl.style.opacity = "1";
    }
  }

  next() {
    this.showPhoto(this.currentIndex + 1);
  }

  prev() {
    this.showPhoto(this.currentIndex - 1);
  }

  togglePause() {
    this.isPaused = !this.isPaused;
    const btn = document.getElementById("carousel-pause");
    if (btn) btn.textContent = this.isPaused ? "▶" : "⏸";
    if (this.isPaused) {
      this.stopAutoPlay();
    } else {
      this.startAutoPlay();
    }
  }

  startAutoPlay() {
    this.stopAutoPlay();
    this.timer = setInterval(() => {
      if (!this.isPaused) {
        this.next();
      }
    }, this.intervalMs);
  }

  stopAutoPlay() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  destroy() {
    this.stopAutoPlay();
    if (this.container) {
      this.container.innerHTML = "";
    }
  }
}
