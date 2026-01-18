/**
 * Cinematic Transition Engine
 * Handles zoom logic and UI state transitions
 */
const Transitions = {
    // Zoom coordinates (percentages) and scale factors
    coords: {
        person:   { scale: 2.5, x: 0, y: -10 },
        monitor:  { scale: 3.2, x: 5, y: 5 },
        ps5:      { scale: 3.8, x: -22, y: 35 },
        pc:       { scale: 3.0, x: -28, y: -18 },
        bonsai:   { scale: 4.2, x: -42, y: -12 },
        clock:    { scale: 5.5, x: -18, y: 38 },
        lavalamp: { scale: 4.0, x: -45, y: -20 },
        window:   { scale: 2.2, x: 45, y: 35 }
    },

    /**
     * Trigger cinematic zoom and transition to content
     * @param {string} objectId - ID of the target hotspot
     * @param {function} callback - Function to render specific object content
     */
    zoomToObject(objectId, callback) {
        const target = this.coords[objectId];
        if (!target) {
            console.error(`Transition coordinates not found for: ${objectId}`);
            return;
        }

        // Cinematic GSAP Zoom
        gsap.to(App.wrapper, {
            scale: target.scale,
            xPercent: target.x,
            yPercent: target.y,
            duration: 2.2,
            ease: "expo.inOut",
            onStart: () => {
                // Prevent further clicks during animation
                document.querySelector('.hotspot-layer').style.pointerEvents = 'none';
            },
            onComplete: () => {
                App.ui.classList.add('active');
                gsap.to(App.ui, { 
                    opacity: 1, 
                    duration: 0.6,
                    ease: "power2.out"
                });
                if (callback) callback();
            }
        });
    },

    /**
     * Reset the camera to the room's default state
     */
    reset() {
        // Fade out UI first
        gsap.to(App.ui, { 
            opacity: 0, 
            duration: 0.4, 
            onComplete: () => {
                App.ui.classList.remove('active');
                App.container.innerHTML = "";
                // Re-enable hotspots
                document.querySelector('.hotspot-layer').style.pointerEvents = 'auto';
            }
        });

        // Zoom back out
        gsap.to(App.wrapper, { 
            scale: 1, 
            xPercent: 0, 
            yPercent: 0, 
            duration: 1.8, 
            ease: "power3.inOut" 
        });
    }
};