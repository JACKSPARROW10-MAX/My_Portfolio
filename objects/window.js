/**
 * Object: Window
 * Theme: Global Vision (theme-window)
 * Logic: Extends App and Transitions components
 */
document.getElementById('hotspot-window').addEventListener('click', () => {
    // 1. Play ambient horizon narration
    App.playAudio('window.mp3');
    
    // 2. Cinematic zoom out toward the city skyline
    Transitions.zoomToObject('window', () => {
        // 3. Render the world-themed content
        Popup.render(`
            <div class="world-content">
                <h1 style="color:var(--p-accent); letter-spacing:4px;">GLOBAL VISION</h1>
                <p style="margin-top:20px; font-size:1.1rem; border-left:3px solid var(--p-accent); padding-left:15px;">
                    "The city outside is a grid of data points; every interface is a window."
                </p>
                <p style="margin-top:15px;">
                    Looking out at the digital horizon reminds me that the applications I build are part of a 
                    much larger, interconnected ecosystem. I believe the best products aren't just tools—they 
                    are perspectives. This window represents my commitment to building globally accessible 
                    software that changes the view for users everywhere.
                </p>
            </div>
        `);
    });
});