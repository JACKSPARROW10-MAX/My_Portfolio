/**
 * Scene Transition & Background Manager Component
 * Handles GSAP transitions between scenes, anime artwork layers, and fallback atmospheric backdrops.
 */

export class SceneTransitionManager {
  constructor(bgContainerElement) {
    this.bgContainer = bgContainerElement;
  }

  transitionToScene(sceneData, onCompleteCallback) {
    if (!this.bgContainer) return;

    const bgLayer = document.createElement("div");
    bgLayer.className = "scene-bg-layer absolute inset-0 bg-cover bg-center transition-all opacity-0 scale-105";

    // Dynamic gradient backdrops per scene when image files are awaiting user upload
    const fallbacks = {
      admission: "radial-gradient(circle at 50% 40%, #1e293b 0%, #0f172a 60%, #020617 100%)",
      beginning: "radial-gradient(circle at 50% 50%, #334155 0%, #1e293b 60%, #0f172a 100%)",
      friends: "radial-gradient(circle at 60% 40%, #312e81 0%, #1e1b4b 60%, #09090b 100%)",
      gaming: "radial-gradient(circle at 50% 50%, #831843 0%, #500724 50%, #09090b 100%)",
      learning: "radial-gradient(circle at 40% 60%, #1e1b4b 0%, #0f172a 60%, #020617 100%)",
      "idea-lab": "radial-gradient(circle at 50% 30%, #0c4a6e 0%, #082f49 60%, #020617 100%)",
      competition: "radial-gradient(circle at 50% 40%, #78350f 0%, #451a03 60%, #09090b 100%)",
      festivals: "radial-gradient(circle at 50% 50%, #701a75 0%, #4a044e 60%, #09090b 100%)",
      memories: "radial-gradient(circle at 50% 50%, #18181b 0%, #09090b 100%)",
      result: "radial-gradient(circle at 50% 40%, #064e3b 0%, #022c22 60%, #020617 100%)",
      ending: "radial-gradient(circle at 50% 30%, #7c2d12 0%, #451a03 60%, #09090b 100%)"
    };

    const gradientFallback = fallbacks[sceneData.id] || "linear-gradient(135deg, #090a0f 0%, #151828 50%, #050608 100%)";

    if (sceneData.bgImage) {
      bgLayer.style.backgroundImage = `url('${sceneData.bgImage}'), ${gradientFallback}`;
    } else {
      bgLayer.style.backgroundImage = gradientFallback;
    }

    // Append layer
    this.bgContainer.appendChild(bgLayer);

    const oldLayers = Array.from(this.bgContainer.children).filter(el => el !== bgLayer);

    if (window.gsap) {
      // Fade out previous layers
      if (oldLayers.length > 0) {
        window.gsap.to(oldLayers, {
          opacity: 0,
          scale: 1,
          duration: 0.8,
          ease: "power2.inOut",
          onComplete: () => {
            oldLayers.forEach(el => el.remove());
          }
        });
      }

      // Fade in new layer with slight Ken Burns zoom
      window.gsap.to(bgLayer, {
        opacity: 1,
        scale: 1,
        duration: 1.2,
        ease: "power2.out",
        onComplete: () => {
          if (onCompleteCallback) onCompleteCallback();
        }
      });
    } else {
      oldLayers.forEach(el => el.remove());
      bgLayer.style.opacity = "1";
      if (onCompleteCallback) onCompleteCallback();
    }
  }
}
