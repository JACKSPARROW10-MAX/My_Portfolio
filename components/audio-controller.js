/**
 * Audio Controller Component
 * Manages narration playback, volume, pause/resume, and fallback timing
 * when audio files are missing or blocked by browser policies.
 */

export class AudioController {
  constructor() {
    this.audio = new Audio();
    this.isPlaying = false;
    this.isMuted = false;
    this.volume = 0.9;
    this.currentTime = 0;
    this.duration = 0;
    this.fallbackTimer = null;
    this.hasAudioFile = false;
    this.onTimeUpdateCallback = null;
    this.onEndedCallback = null;

    this.audio.volume = this.volume;

    // Standard audio event listeners
    this.audio.addEventListener("timeupdate", () => {
      if (this.hasAudioFile) {
        this.currentTime = this.audio.currentTime;
        if (this.onTimeUpdateCallback) {
          this.onTimeUpdateCallback(this.currentTime);
        }
      }
    });

    this.audio.addEventListener("ended", () => {
      this.isPlaying = false;
      if (this.onEndedCallback) {
        this.onEndedCallback();
      }
    });

    this.audio.addEventListener("error", (e) => {
      console.warn("Audio file missing or unplayable, using synchronized fallback timer:", e);
      this.hasAudioFile = false;
    });
  }

  load(src, fallbackDuration = 20) {
    this.stop();
    this.currentTime = 0;
    this.duration = fallbackDuration;

    if (!src) {
      this.hasAudioFile = false;
      return;
    }

    this.audio.src = src;
    this.audio.load();

    // Check if audio file can play
    const promise = this.audio.play();
    if (promise !== undefined) {
      promise
        .then(() => {
          this.hasAudioFile = true;
          this.isPlaying = true;
        })
        .catch(() => {
          // Playback failed (file missing or autoplay restriction)
          this.hasAudioFile = false;
          this.isPlaying = true;
          this.startFallbackTimer();
        });
    }
  }

  play() {
    this.isPlaying = true;
    if (this.hasAudioFile) {
      this.audio.play().catch(() => {
        this.startFallbackTimer();
      });
    } else {
      this.startFallbackTimer();
    }
  }

  pause() {
    this.isPlaying = false;
    if (this.hasAudioFile) {
      this.audio.pause();
    }
    if (this.fallbackTimer) {
      clearInterval(this.fallbackTimer);
      this.fallbackTimer = null;
    }
  }

  stop() {
    this.isPlaying = false;
    if (this.audio) {
      this.audio.pause();
      this.audio.currentTime = 0;
    }
    if (this.fallbackTimer) {
      clearInterval(this.fallbackTimer);
      this.fallbackTimer = null;
    }
  }

  seek(seconds) {
    this.currentTime = seconds;
    if (this.hasAudioFile) {
      this.audio.currentTime = seconds;
    }
  }

  setVolume(val) {
    this.volume = Math.max(0, Math.min(1, val));
    this.audio.volume = this.volume;
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    this.audio.muted = this.isMuted;
    return this.isMuted;
  }

  startFallbackTimer() {
    if (this.fallbackTimer) clearInterval(this.fallbackTimer);

    const stepMs = 100;
    this.fallbackTimer = setInterval(() => {
      if (!this.isPlaying) return;
      this.currentTime += stepMs / 1000;
      if (this.onTimeUpdateCallback) {
        this.onTimeUpdateCallback(this.currentTime);
      }

      if (this.currentTime >= this.duration) {
        this.pause();
        if (this.onEndedCallback) {
          this.onEndedCallback();
        }
      }
    }, stepMs);
  }

  onTimeUpdate(fn) {
    this.onTimeUpdateCallback = fn;
  }

  onEnded(fn) {
    this.onEndedCallback = fn;
  }
}
