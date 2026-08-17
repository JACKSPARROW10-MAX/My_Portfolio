/**
 * Visual Effects Component
 * Canvas-based particle rendering, atmospheric rain, lightning, neon glows, and tech overlays.
 */

export class VisualEffectsEngine {
  constructor(canvasElement) {
    this.canvas = canvasElement;
    this.ctx = canvasElement ? canvasElement.getContext("2d") : null;
    this.particles = [];
    this.effectType = "none";
    this.animFrameId = null;
    this.width = 0;
    this.height = 0;

    this.resize = this.resize.bind(this);
    window.addEventListener("resize", this.resize);
    this.resize();
  }

  resize() {
    if (!this.canvas) return;
    this.width = this.canvas.width = window.innerWidth;
    this.height = this.canvas.height = window.innerHeight;
  }

  setEffect(type, extraData = {}) {
    this.effectType = type;
    this.particles = [];
    this.extraData = extraData;

    if (this.animFrameId) {
      cancelAnimationFrame(this.animFrameId);
      this.animFrameId = null;
    }

    if (type === "rain") {
      this.initRain();
    } else if (type === "gaming-neon") {
      this.initNeon();
    } else if (type === "trophy-particles") {
      this.initGoldParticles();
    } else if (type === "festival-sparks") {
      this.initFestiveSparks();
    } else if (type === "sunset-glow") {
      this.initSunsetParticles();
    }

    this.animate = this.animate.bind(this);
    this.animate();
  }

  initRain() {
    const count = Math.floor(this.width / 5);
    for (let i = 0; i < count; i++) {
      this.particles.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        length: Math.random() * 20 + 10,
        speed: Math.random() * 10 + 12,
        opacity: Math.random() * 0.4 + 0.2
      });
    }
  }

  initNeon() {
    for (let i = 0; i < 40; i++) {
      this.particles.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        size: Math.random() * 4 + 2,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        color: Math.random() > 0.5 ? "#ec4899" : "#6366f1",
        alpha: Math.random() * 0.6 + 0.3
      });
    }
  }

  initGoldParticles() {
    for (let i = 0; i < 70; i++) {
      this.particles.push({
        x: Math.random() * this.width,
        y: this.height + Math.random() * 100,
        size: Math.random() * 5 + 2,
        vy: -(Math.random() * 3 + 1),
        vx: (Math.random() - 0.5) * 1.5,
        alpha: Math.random() * 0.8 + 0.2,
        color: "#fbbf24"
      });
    }
  }

  initFestiveSparks() {
    for (let i = 0; i < 60; i++) {
      this.particles.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        size: Math.random() * 6 + 2,
        vx: (Math.random() - 0.5) * 3,
        vy: (Math.random() - 0.5) * 3,
        color: `hsl(${Math.floor(Math.random() * 360)}, 85%, 60%)`,
        alpha: Math.random() * 0.8 + 0.2
      });
    }
  }

  initSunsetParticles() {
    for (let i = 0; i < 35; i++) {
      this.particles.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        size: Math.random() * 5 + 1.5,
        vy: -(Math.random() * 0.8 + 0.2),
        vx: (Math.random() - 0.5) * 0.5,
        color: "#f97316",
        alpha: Math.random() * 0.5 + 0.2
      });
    }
  }

  animate() {
    if (!this.ctx) return;
    this.ctx.clearRect(0, 0, this.width, this.height);

    if (this.effectType === "rain") {
      this.ctx.strokeStyle = "rgba(174, 194, 224, 0.4)";
      this.ctx.lineWidth = 1.5;
      this.particles.forEach((p) => {
        this.ctx.beginPath();
        this.ctx.moveTo(p.x, p.y);
        this.ctx.lineTo(p.x - p.length * 0.2, p.y + p.length);
        this.ctx.stroke();

        p.y += p.speed;
        p.x -= p.speed * 0.2;
        if (p.y > this.height) {
          p.y = -20;
          p.x = Math.random() * this.width;
        }
      });
    } else if (this.effectType === "gaming-neon" || this.effectType === "festival-sparks") {
      this.particles.forEach((p) => {
        this.ctx.fillStyle = p.color;
        this.ctx.globalAlpha = p.alpha;
        this.ctx.beginPath();
        this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        this.ctx.fill();

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > this.width) p.vx *= -1;
        if (p.y < 0 || p.y > this.height) p.vy *= -1;
      });
      this.ctx.globalAlpha = 1;
    } else if (this.effectType === "trophy-particles" || this.effectType === "sunset-glow") {
      this.particles.forEach((p) => {
        this.ctx.fillStyle = p.color;
        this.ctx.globalAlpha = p.alpha;
        this.ctx.beginPath();
        this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        this.ctx.fill();

        p.y += p.vy;
        p.x += p.vx;

        if (p.y < -20) {
          p.y = this.height + 20;
          p.x = Math.random() * this.width;
        }
      });
      this.ctx.globalAlpha = 1;
    }

    this.animFrameId = requestAnimationFrame(this.animate);
  }

  destroy() {
    if (this.animFrameId) {
      cancelAnimationFrame(this.animFrameId);
    }
    window.removeEventListener("resize", this.resize);
  }
}
