document.getElementById('hotspot-clock').addEventListener('click', () => {
    App.playAudio('clock.mp3');
    Transitions.zoomToObject('clock', () => {
        Popup.render(`
            <h1 style="color:var(--accent); margin-bottom:20px;">Temporal Logic</h1>
            <p style="font-size:1.2rem; line-height:1.8;">
                Time is the only asset we cannot buy. In development, timing is everything—from 
                optimizing millisecond latency to hitting project milestones. 
                I value efficiency and the discipline of a well-spent hour.
            </p>
        `);
    });
});