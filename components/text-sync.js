/**
 * Text Synchronizer Component
 * Handles timestamp-based subtitle/narration text updates with GSAP animations.
 */

export class TextSynchronizer {
  constructor(containerElement) {
    this.container = containerElement;
    this.currentLineIndex = -1;
    this.lines = [];
  }

  setLines(storyLines) {
    this.lines = storyLines || [];
    this.currentLineIndex = -1;
    if (this.container) {
      this.container.innerHTML = "";
    }
  }

  update(currentTime) {
    if (!this.lines.length || !this.container) return;

    // Find line corresponding to current timestamp
    const index = this.lines.findIndex(
      (l) => currentTime >= l.start && currentTime <= l.end
    );

    if (index !== -1 && index !== this.currentLineIndex) {
      this.currentLineIndex = index;
      this.renderLine(this.lines[index]);
    } else if (index === -1 && this.currentLineIndex !== -1) {
      // Clear line when between ranges if needed, or leave previous line visible
      const lastLine = this.lines[this.currentLineIndex];
      if (currentTime > lastLine.end + 0.5) {
        this.fadeOutCurrentLine();
        this.currentLineIndex = -1;
      }
    }
  }

  renderLine(lineObj) {
    if (!this.container) return;

    // Create wrapper for the new line
    const lineEl = document.createElement("div");
    lineEl.className = `story-line-text ${lineObj.emphasis ? "emphasis-line" : ""}`;

    let html = lineObj.text;
    if (lineObj.highlight) {
      const regex = new RegExp(`(${lineObj.highlight})`, "gi");
      html = html.replace(
        regex,
        `<span class="text-highlight bg-gradient-to-r from-amber-300 via-rose-400 to-indigo-400 bg-clip-text text-transparent font-bold">$1</span>`
      );
    }

    lineEl.innerHTML = html;

    // Transition previous line out, then animate new line in
    const existingChildren = Array.from(this.container.children);
    if (window.gsap && existingChildren.length > 0) {
      window.gsap.to(existingChildren, {
        opacity: 0,
        y: -15,
        duration: 0.3,
        onComplete: () => {
          this.container.innerHTML = "";
          this.container.appendChild(lineEl);
          window.gsap.fromTo(
            lineEl,
            { opacity: 0, y: 20, scale: 0.98 },
            { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: "power2.out" }
          );
        }
      });
    } else {
      this.container.innerHTML = "";
      this.container.appendChild(lineEl);
      if (window.gsap) {
        window.gsap.fromTo(
          lineEl,
          { opacity: 0, y: 20, scale: 0.98 },
          { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: "power2.out" }
        );
      }
    }
  }

  fadeOutCurrentLine() {
    const existingChildren = Array.from(this.container.children);
    if (this.container && window.gsap && existingChildren.length > 0) {
      window.gsap.to(existingChildren, {
        opacity: 0,
        y: -10,
        duration: 0.4
      });
    }
  }
}
