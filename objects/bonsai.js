document.getElementById('hotspot-bonsai').addEventListener('click', () => {
    App.playAudio('bonsai.mp3');
    
    Transitions.zoomToObject('bonsai', () => {
        Popup.render(`
            <div class="world-content">
                <h1 style="color:var(--p-accent); letter-spacing:4px;">ORGANIC LOGIC</h1>
                <p style="margin-top:20px;">Every project starts as a seed. I find my best logic in calm, natural environments.</p>
                
                <div class="custom-nav-wrapper" style="margin-top:30px; text-align:center;">
                    <a href="scenes/nature.html" class="leaf-btn">
                        <svg viewBox="0 0 24 24" class="leaf-icon">
                            <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8.12,20C11,20 19,15 21,3C21,3 14,2 17,8Z" />
                        </svg>
                        <span>ROOT_DATA</span>
                    </a>
                </div>
            </div>
        `);
    });
});