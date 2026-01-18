const App = {
    currentAudio: null,

    init() {
        this.wrapper = document.getElementById('scene-wrapper');
        this.ui = document.getElementById('ui-layer');
        this.container = document.getElementById('content-container');
        document.getElementById('back-btn').onclick = () => Transitions.reset();
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