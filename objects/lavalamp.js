/**
 * Object: Lava Lamp
 * Theme: Creative Flow (theme-lavalamp)
 * Logic: Extends App and Transitions components
 */
document.getElementById('hotspot-lavalamp').addEventListener('click', () => {
    // 1. Stop previous audio and play narration
    App.playAudio('lavalamp.mp3');
    
    // 2. Trigger cinematic zoom toward the far right
    Transitions.zoomToObject('lavalamp', () => {
        // 3. Render themed scene content
        Popup.render(`
            <div class="world-content">
                <h1 style="color:var(--p-accent); letter-spacing:4px;">CREATIVE FLOW</h1>
                <p style="margin-top:20px; font-style:italic; border-left:3px solid var(--p-accent); padding-left:15px;">
                    "Like the wax in a lamp, code should be fluid and adaptable."
                </p>
                <p style="margin-top:15px;">
                    Every developer needs a 'liquid state'—a headspace where logic hits a wall and intuition takes over. 
                    This corner of my room is where I brainstorm, letting the ambient motion of the lamp help me 
                    visualize fluid UI transitions and aesthetic explorations.
                </p>
            </div>
        `);
    });
});