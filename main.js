/**
 * Application Entry & Mode Router
 * Handles Landing Page animations, user choices, and mounting active experiences.
 */

import { FirstYearStoryEngine } from "./auto-explore/first-year.js";
import { ManualPortfolioEngine } from "./manual/manual.js";

document.addEventListener("DOMContentLoaded", () => {
  const landingPage = document.getElementById("landing-page");
  const autoContainer = document.getElementById("auto-explore-container");
  const manualContainer = document.getElementById("manual-container");

  const btnAuto = document.getElementById("btn-auto-explore");
  const btnManual = document.getElementById("btn-manual-explore");

  let storyEngine = null;
  let manualEngine = null;

  // GSAP Entrance Animations
  if (window.gsap) {
    window.gsap.from("#landing-page h1", {
      opacity: 0,
      y: 30,
      duration: 1,
      ease: "power3.out"
    });

    window.gsap.from("#landing-page p", {
      opacity: 0,
      y: 20,
      duration: 1,
      delay: 0.2,
      ease: "power3.out"
    });

    window.gsap.from("#btn-auto-explore, #btn-manual-explore", {
      opacity: 0,
      y: 40,
      duration: 1,
      stagger: 0.2,
      delay: 0.4,
      ease: "power3.out"
    });
  }

  // Handle Mode 1: Auto Explore
  btnAuto?.addEventListener("click", () => {
    if (window.gsap) {
      window.gsap.to(landingPage, {
        opacity: 0,
        scale: 0.95,
        duration: 0.6,
        onComplete: () => {
          landingPage.classList.add("hidden");
          autoContainer.classList.remove("hidden");
          autoContainer.style.opacity = "1";

          storyEngine = new FirstYearStoryEngine({
            container: autoContainer,
            onExit: returnToLanding
          });
          storyEngine.start();
        }
      });
    } else {
      landingPage.classList.add("hidden");
      autoContainer.classList.remove("hidden");

      storyEngine = new FirstYearStoryEngine({
        container: autoContainer,
        onExit: returnToLanding
      });
      storyEngine.start();
    }
  });

  // Handle Mode 2: Manual Explore
  btnManual?.addEventListener("click", () => {
    if (window.gsap) {
      window.gsap.to(landingPage, {
        opacity: 0,
        scale: 0.95,
        duration: 0.6,
        onComplete: () => {
          landingPage.classList.add("hidden");
          manualContainer.classList.remove("hidden");

          manualEngine = new ManualPortfolioEngine({
            container: manualContainer,
            onBackToLanding: returnToLanding
          });
          manualEngine.render();
        }
      });
    } else {
      landingPage.classList.add("hidden");
      manualContainer.classList.remove("hidden");

      manualEngine = new ManualPortfolioEngine({
        container: manualContainer,
        onBackToLanding: returnToLanding
      });
      manualEngine.render();
    }
  });

  // Function to return back to Landing Page
  function returnToLanding() {
    autoContainer.classList.add("hidden");
    manualContainer.classList.add("hidden");
    landingPage.classList.remove("hidden");

    if (window.gsap) {
      window.gsap.fromTo(
        landingPage,
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.6, ease: "power2.out" }
      );
    } else {
      landingPage.style.opacity = "1";
    }
  }
});
