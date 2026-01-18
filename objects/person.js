/**
 * Object: Person (The Architect)
 * World: Identity Log
 */
document.getElementById('hotspot-person').addEventListener('click', () => {
    // 1. Play identity narration
    App.playAudio('person.mp3');
    
    // 2. Trigger the cinematic zoom defined in transitions.js
    Transitions.zoomToObject('person', () => {
        // 3. Render the Identity Card inside the popup
        Popup.render(`
            <div class="terminal-world">
                <div class="terminal-header">
                    <span class="status-dot"></span>
                    <h1 class="terminal-title">IDENTITY_LOG // ARCHITECT</h1>
                </div>
                
                <div class="terminal-body">
                    <p class="status-code">STATUS: ONLINE // USER_01</p>
                    <p style="margin-top:15px; line-height:1.8;">
                        Hello, I am the developer behind this simulation. I specialize in 
                        creating high-fidelity, interactive web environments. 
                        I have prepared this room to guide you through my creative journey.
                    </p>
                </div>

                <div class="console-nav" style="margin-top:30px;">
                    <button class="glass-btn" onclick="window.location.href='about-me.html'">
                        <span class="btn-id">ID</span>
                        <span class="btn-label">VIEW FULL BIO</span>
                        <div class="btn-glow"></div>
                    </button>
                </div>
            </div>
        `);
    });
});