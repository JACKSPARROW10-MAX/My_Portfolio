const App = {
    currentAudio: null,

    init() {
        this.cacheDOM();
        this.bindEvents();
        this.adjustHotspotLayer();
        
        // Keep hotspots synced with GIF pixels on window resize
        window.addEventListener('resize', () => this.adjustHotspotLayer());

        // CINEMATIC AUTO-START: Zooms into Person on page load
        window.addEventListener('load', () => {
            setTimeout(() => this.triggerAutoIntro(), 1000);
        });
    },

    cacheDOM() {
        this.wrapper = document.getElementById('scene-wrapper');
        this.ui = document.getElementById('ui-layer');
        this.container = document.getElementById('content-container');
        this.image = document.querySelector('.bg-asset');
        this.layer = document.querySelector('.hotspot-layer');
    },

    adjustHotspotLayer() {
        if (!this.image) return;
        const rect = this.image.getBoundingClientRect();
        this.layer.style.width = rect.width + 'px';
        this.layer.style.height = rect.height + 'px';
    },

    bindEvents() {
        document.getElementById('back-btn').onclick = () => Transitions.reset();
        // Allow closing the card by clicking the dark overlay
        this.ui.onclick = (e) => { if(e.target === this.ui) Transitions.reset(); };
    },

    triggerAutoIntro() {
        const personHotspot = document.getElementById('hotspot-person');
        if (personHotspot) {
            personHotspot.click(); // Programmatic click triggers person.js logic
        }
    },

    playAudio(file) {
        if (this.currentAudio) {
            this.currentAudio.pause();
            this.currentAudio.currentTime = 0;
        }
        this.currentAudio = new Audio(`audio/${file}`);
        this.currentAudio.play().catch(() => console.log("Audio waiting for user interaction"));
    }
};

document.addEventListener('DOMContentLoaded', () => App.init());