/**
 * Object: About Me (Person)
 * Theme: Identity Log (theme-person)
 * Logic: Extends App and Transitions components
 */
document.getElementById('hotspot-person').addEventListener('click', () => {
    // 1. Identity narration trigger
    App.playAudio('person.mp3');
    
    // 2. Cinematic zoom into the character center
    Transitions.zoomToObject('person', () => {
        // 3. Render the personal story world
        Popup.render(`
            <div class="world-content">
                <h1 style="color:var(--p-accent); letter-spacing:4px;">THE ARCHITECT</h1>
                <p style="margin-top:20px; font-size:1.2rem; color:var(--p-accent);">User-01 Detected.</p>
                <p style="margin-top:15px;">
                    I am a frontend engineer dedicated to building high-fidelity simulations where 
                    logic meets cinematic design. Most nights, you will find me right here—turning 
                    complex technical problems into seamless, interactive user journeys.
                </p>
                <p style="margin-top:10px; opacity:0.8;">
                    Welcome to my simulation. Feel free to explore the objects in this room to 
                    learn more about my stack and my story.
                </p>
            </div>
        `);
    });
});