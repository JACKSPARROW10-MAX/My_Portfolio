document.getElementById('hotspot-ps5').addEventListener('click', () => {
    App.playAudio('ps5.mp3');
    
    Transitions.zoomToObject('ps5', () => {
        Popup.render(`
            <div class="world-content">
                <h1 style="color:var(--p-accent); letter-spacing:4px;">GAMING & GRIT</h1>
                <p style="margin-top:20px;">Persistence is built through play. Select a node to continue.</p>
                
                <div class="custom-nav-wrapper" style="display:flex; justify-content:center; gap:40px; margin-top:30px;">
                    <a href="scenes/gaming.html" class="icon-nav-btn" title="Gaming Portfolio">
                        <svg viewBox="0 0 24 24" class="svg-icon">
                            <path d="M7,11H5V13H7V15H9V13H11V11H9V9H7V11M18.5,9A1.5,1.5 0 0,0 17,10.5A1.5,1.5 0 0,0 18.5,12A1.5,1.5 0 0,0 20,10.5A1.5,1.5 0 0,0 18.5,9M15.5,12A1.5,1.5 0 0,0 14,13.5A1.5,1.5 0 0,0 15.5,15A1.5,1.5 0 0,0 17,13.5A1.5,1.5 0 0,0 15.5,12M12,4A10,10 0 0,0 2,14A10,10 0 0,0 12,24A10,10 0 0,0 22,14A10,10 0 0,0 12,4Z" />
                        </svg>
                        <span>PLAY_MODE</span>
                    </a>

                    <a href="scenes/education.html" class="icon-nav-btn" title="Education">
                        <svg viewBox="0 0 24 24" class="svg-icon">
                            <path d="M19,2L14,6.5V17.5L19,13V2M6.5,5C4.55,5 2.45,5.4 1,6.5V21C2.45,19.9 4.55,19.5 6.5,19.5C8.45,19.5 10.55,19.9 12,21C13.45,19.9 15.55,19.5 17.5,19.5C19.45,19.5 21.55,19.9 23,21V6.5C21.55,5.4 19.45,5 17.5,5C15.55,5 13.45,5.4 12,6.5C10.55,5.4 8.45,5 6.5,5Z" />
                        </svg>
                        <span>STUDY_LOG</span>
                    </a>
                </div>
            </div>
        `);
    });
});