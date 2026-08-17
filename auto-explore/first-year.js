/**
 * First Year Story Engine Controller
 * Manages full scene flow, state transitions, audio sync, and user controls.
 */

import { firstYearStory } from "../data/first-year-story.js";
import { AudioController } from "../components/audio-controller.js";
import { TextSynchronizer } from "../components/text-sync.js";
import { SceneTransitionManager } from "../components/scene-transition.js";
import { PhotoCarousel } from "../components/photo-carousel.js";
import { VisualEffectsEngine } from "../components/visual-effects.js";

export class FirstYearStoryEngine {
  constructor(options = {}) {
    this.container = options.container;
    this.onExitCallback = options.onExit;

    this.currentSceneIndex = 0;
    this.audioController = new AudioController();
    this.textSync = null;
    this.transitionManager = null;
    this.visualEffects = null;
    this.photoCarousel = null;

    this.isPaused = false;
    this.inactivityTimer = null;

    this.initDOM();
  }

  initDOM() {
    if (!this.container) return;

    this.container.innerHTML = `
      <div id="story-viewport" class="relative w-full h-screen overflow-hidden bg-black select-none">
        
        <!-- Canvas Visual Effects Layer -->
        <canvas id="story-canvas" class="absolute inset-0 z-10 pointer-events-none"></canvas>
        
        <!-- Background Artwork Layer -->
        <div id="story-bg" class="absolute inset-0 z-0"></div>
        
        <!-- Dynamic Foreground Overlay (Tech badges, CGPA Banner, Trophy reveal, Photo Carousel) -->
        <div id="story-overlay" class="absolute inset-0 z-20 pointer-events-none flex items-center justify-center p-6"></div>
        
        <!-- Story Subtitles Container -->
        <div class="absolute bottom-24 left-1/2 -translate-x-1/2 z-30 w-full max-w-3xl px-6 text-center pointer-events-none">
          <div id="story-subtitles" class="min-h-[90px] flex items-center justify-center"></div>
        </div>
        
        <!-- Minimal Cinematic Controls Header/Footer Overlay -->
        <div id="story-controls" class="absolute inset-0 z-40 flex flex-col justify-between p-6 pointer-events-auto transition-opacity duration-500">
          
          <!-- Top Header: Title & Progress -->
          <div class="flex items-center justify-between w-full">
            <div class="flex items-center gap-3">
              <span class="w-2 h-2 rounded-full bg-rose-500 animate-ping"></span>
              <span id="story-chapter-title" class="text-xs uppercase tracking-widest text-neutral-400 font-medium">FIRST YEAR</span>
              <span class="text-neutral-600">•</span>
              <span id="story-scene-counter" class="text-xs tracking-wider text-neutral-300">01 / 11</span>
            </div>
            
            <button id="story-exit-btn" class="flex items-center gap-2 px-4 py-2 rounded-full glass hover:bg-rose-500/20 hover:border-rose-500/40 text-xs text-neutral-300 transition-all">
              <span>✕ Exit</span>
            </button>
          </div>
          
          <!-- Bottom Controls Bar -->
          <div class="flex items-center justify-between w-full max-w-4xl mx-auto glass rounded-2xl px-6 py-3 border border-white/10 shadow-2xl">
            <div class="flex items-center gap-4">
              <button id="story-pause-btn" class="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white text-sm transition-all">
                ⏸
              </button>
              <button id="story-replay-btn" class="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white text-sm transition-all" title="Replay Scene">
                ↻
              </button>
            </div>
            
            <div class="flex items-center gap-2 flex-1 max-w-xs mx-6">
              <div class="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                <div id="story-progress-bar" class="bg-gradient-to-r from-indigo-500 via-pink-500 to-rose-500 h-full w-0 transition-all duration-300"></div>
              </div>
            </div>
            
            <div class="flex items-center gap-4">
              <button id="story-mute-btn" class="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white text-sm transition-all">
                🔊
              </button>
              <button id="story-skip-btn" class="flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-indigo-600 to-rose-600 hover:opacity-90 text-white text-xs font-semibold tracking-wider transition-all">
                <span>Skip</span>
                <span>→</span>
              </button>
            </div>
          </div>
        </div>

        <!-- Next Chapter Modal -->
        <div id="next-chapter-modal" class="hidden absolute inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-6 text-center">
          <div class="max-w-md w-full glass p-8 rounded-3xl border border-white/10 space-y-6">
            <div class="text-5xl">✨</div>
            <h2 class="text-3xl font-bold bg-gradient-to-r from-indigo-400 to-rose-400 bg-clip-text text-transparent">First Year Complete</h2>
            <p class="text-neutral-300 text-sm leading-relaxed">You've reached the end of First Year story. Second Year chapter is currently in development!</p>
            <div class="flex flex-col gap-3">
              <button id="modal-replay-btn" class="w-full py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium text-sm transition-all">
                ↻ Replay First Year
              </button>
              <button id="modal-manual-btn" class="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-rose-600 hover:opacity-90 text-white font-semibold text-sm transition-all">
                🖱 Explore Portfolio Manually
              </button>
            </div>
          </div>
        </div>

      </div>
    `;

    // Instantiate components
    const canvas = document.getElementById("story-canvas");
    const bgContainer = document.getElementById("story-bg");
    const subtitlesContainer = document.getElementById("story-subtitles");

    this.visualEffects = new VisualEffectsEngine(canvas);
    this.transitionManager = new SceneTransitionManager(bgContainer);
    this.textSync = new TextSynchronizer(subtitlesContainer);

    this.bindEvents();
  }

  bindEvents() {
    document.getElementById("story-exit-btn")?.addEventListener("click", () => this.exit());
    document.getElementById("story-pause-btn")?.addEventListener("click", () => this.togglePause());
    document.getElementById("story-replay-btn")?.addEventListener("click", () => this.replayScene());
    document.getElementById("story-mute-btn")?.addEventListener("click", () => this.toggleMute());
    document.getElementById("story-skip-btn")?.addEventListener("click", () => this.nextScene());

    document.getElementById("modal-replay-btn")?.addEventListener("click", () => {
      document.getElementById("next-chapter-modal")?.classList.add("hidden");
      this.loadScene(0);
    });

    document.getElementById("modal-manual-btn")?.addEventListener("click", () => {
      this.exit();
    });

    // Inactivity auto-hide controls
    const viewport = document.getElementById("story-viewport");
    const controls = document.getElementById("story-controls");

    const resetInactivity = () => {
      if (controls) controls.style.opacity = "1";
      clearTimeout(this.inactivityTimer);
      this.inactivityTimer = setTimeout(() => {
        if (controls && !this.isPaused) controls.style.opacity = "0";
      }, 3500);
    };

    viewport?.addEventListener("mousemove", resetInactivity);
    viewport?.addEventListener("touchstart", resetInactivity);

    // Audio controller event bindings
    this.audioController.onTimeUpdate((time) => {
      this.textSync.update(time);

      // Update progress bar
      const currentScene = firstYearStory.scenes[this.currentSceneIndex];
      if (currentScene) {
        const pct = Math.min(100, (time / (currentScene.duration || 20)) * 100);
        const progressBar = document.getElementById("story-progress-bar");
        if (progressBar) progressBar.style.width = `${pct}%`;
      }
    });

    this.audioController.onEnded(() => {
      this.nextScene();
    });
  }

  start() {
    this.currentSceneIndex = 0;
    this.loadScene(0);
  }

  loadScene(index) {
    if (index >= firstYearStory.scenes.length) {
      this.showEndingModal();
      return;
    }

    this.currentSceneIndex = index;
    const scene = firstYearStory.scenes[index];

    // Update scene metadata counter
    const sceneCounter = document.getElementById("story-scene-counter");
    if (sceneCounter) {
      const numStr = (scene.number < 10 ? "0" : "") + scene.number;
      sceneCounter.textContent = `${numStr} / ${firstYearStory.totalScenes}`;
    }

    // Set canvas atmospheric effect
    this.visualEffects.setEffect(scene.effect || "none");

    // Clean up photo carousel if existing
    if (this.photoCarousel) {
      this.photoCarousel.destroy();
      this.photoCarousel = null;
    }

    // Render custom overlay for scenes (Tech icons, Idea Lab HUD, Trophy reveal, CGPA reveal, Real Photos)
    this.renderSceneOverlay(scene);

    // Set subtitle lines
    this.textSync.setLines(scene.storyLines);

    // Perform scene transition
    this.transitionManager.transitionToScene(scene, () => {
      // Start audio playback & synchronized timer
      this.audioController.load(scene.audioSrc, scene.duration);
    });
  }

  renderSceneOverlay(scene) {
    const overlay = document.getElementById("story-overlay");
    if (!overlay) return;
    overlay.innerHTML = "";

    if (scene.id === "learning" && scene.techIcons) {
      // Floating technology badges
      const techWrap = document.createElement("div");
      techWrap.className = "flex flex-wrap gap-4 items-center justify-center pointer-events-auto";
      scene.techIcons.forEach((tech) => {
        const badge = document.createElement("div");
        badge.className = "px-6 py-3 rounded-2xl glass font-bold text-lg text-indigo-300 shadow-xl tracking-wide animate-pulse border border-indigo-500/30";
        badge.textContent = tech;
        techWrap.appendChild(badge);
      });
      overlay.appendChild(techWrap);
    } else if (scene.id === "idea-lab") {
      // Project Blueprint Card
      const projectCard = document.createElement("div");
      projectCard.className = "glass p-8 rounded-3xl max-w-lg text-center border border-sky-500/30 shadow-2xl pointer-events-auto space-y-3";
      projectCard.innerHTML = `
        <div class="text-xs uppercase tracking-widest text-sky-400 font-mono">IDEA LAB PROJECT</div>
        <h3 class="text-2xl font-bold text-white tracking-wide">${scene.projectTitle}</h3>
        <p class="text-xs text-neutral-300">Intelligent adaptive vehicle lighting to enhance road safety & reduce accidents</p>
      `;
      overlay.appendChild(projectCard);
    } else if (scene.id === "competition") {
      // Golden Victory Trophy Reveal
      const trophyBox = document.createElement("div");
      trophyBox.className = "flex flex-col items-center justify-center text-center space-y-4 pointer-events-auto";
      trophyBox.innerHTML = `
        <div class="text-7xl animate-bounce">🏆</div>
        <div class="px-8 py-3 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 font-bold tracking-widest uppercase text-sm glass">
          1st Place — IDEA LAB Winner
        </div>
      `;
      overlay.appendChild(trophyBox);
    } else if (scene.id === "memories" && scene.photos) {
      // Real Photographs Gallery Carousel
      const carouselContainer = document.createElement("div");
      carouselContainer.className = "w-full max-w-3xl h-[380px] pointer-events-auto";
      overlay.appendChild(carouselContainer);

      this.photoCarousel = new PhotoCarousel(carouselContainer);
      this.photoCarousel.init(scene.photos);
    } else if (scene.id === "result") {
      // Cinematic 8.87 CGPA Reveal
      const resultCard = document.createElement("div");
      resultCard.className = "flex flex-col items-center justify-center space-y-2 pointer-events-auto text-center";
      resultCard.innerHTML = `
        <div class="text-sm uppercase tracking-widest text-emerald-400 font-semibold">FIRST YEAR RESULT</div>
        <div class="text-7xl md:text-8xl font-black bg-gradient-to-r from-emerald-400 via-teal-300 to-indigo-400 bg-clip-text text-transparent drop-shadow-2xl">
          ${scene.cgpa}
        </div>
        <div class="text-lg font-bold tracking-widest text-neutral-300">CGPA</div>
      `;
      overlay.appendChild(resultCard);
    }
  }

  nextScene() {
    this.loadScene(this.currentSceneIndex + 1);
  }

  prevScene() {
    if (this.currentSceneIndex > 0) {
      this.loadScene(this.currentSceneIndex - 1);
    }
  }

  replayScene() {
    this.loadScene(this.currentSceneIndex);
  }

  togglePause() {
    this.isPaused = !this.isPaused;
    const btn = document.getElementById("story-pause-btn");
    if (btn) btn.textContent = this.isPaused ? "▶" : "⏸";

    if (this.isPaused) {
      this.audioController.pause();
    } else {
      this.audioController.play();
    }
  }

  toggleMute() {
    const isMuted = this.audioController.toggleMute();
    const btn = document.getElementById("story-mute-btn");
    if (btn) btn.textContent = isMuted ? "🔇" : "🔊";
  }

  showEndingModal() {
    this.audioController.stop();
    const modal = document.getElementById("next-chapter-modal");
    if (modal) modal.classList.remove("hidden");
  }

  exit() {
    this.audioController.stop();
    if (this.photoCarousel) this.photoCarousel.destroy();
    if (this.visualEffects) this.visualEffects.destroy();
    if (this.onExitCallback) this.onExitCallback();
  }
}
