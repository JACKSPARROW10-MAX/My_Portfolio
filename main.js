const App = {
    audio: null,

    init() {
        this.overlay = document.getElementById('popup-overlay');
        this.card = document.getElementById('popup-card');
        this.title = document.getElementById('popup-title');
        this.text = document.getElementById('popup-text');
        this.layer = document.querySelector('.hotspot-layer');
        this.image = document.querySelector('.bg-asset');

        this.bindEvents();
        this.adjustHotspotLayer();
        window.addEventListener('resize', () => this.adjustHotspotLayer());
    },

    adjustHotspotLayer() {
        const rect = this.image.getBoundingClientRect();
        this.layer.style.width = rect.width + 'px';
        this.layer.style.height = rect.height + 'px';
    },

    bindEvents() {
        document.querySelector('.close-btn').onclick = () => this.hidePopup();
        this.overlay.onclick = (e) => { if(e.target === this.overlay) this.hidePopup(); };
    },

    typeText(text, element) {
        let i = 0;
        element.innerHTML = "";
        const timer = setInterval(() => {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
            } else { clearInterval(timer); }
        }, 30);
    },

    showPopup(title, content, audioFile, themeClass) {
        if (this.audio) { this.audio.pause(); this.audio.currentTime = 0; }
        this.card.className = `popup-box ${themeClass}`;
        this.title.innerText = title;
        this.overlay.classList.add('active');
        this.typeText(content, this.text);
        
        this.audio = new Audio(`audio/${audioFile}`);
        this.audio.play().catch(() => {});

        gsap.fromTo(this.card, 
            { clipPath: "inset(50% 0 50% 0)", opacity: 0 },
            { clipPath: "inset(0% 0 0% 0)", opacity: 1, duration: 0.7, ease: "expo.out" }
        );
    },

    hidePopup() {
        this.overlay.classList.remove('active');
        if (this.audio) this.audio.pause();
    }
};

document.addEventListener('DOMContentLoaded', () => App.init());