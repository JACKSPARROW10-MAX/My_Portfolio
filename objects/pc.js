document.getElementById('hotspot-pc').addEventListener('click', () => {
    App.playAudio('pc.mp3');
    Transitions.zoomToObject('pc', () => {
        Popup.render(`
            <h1 style="color:var(--accent); margin-bottom:20px;">The Engine</h1>
            <p style="font-style:italic; margin-bottom:20px;">"This PC has 32GB RAM and 2TB SSD"</p>
            <div style="text-align:center; margin:30px 0;">
                <div id="folder-trigger" style="cursor:pointer; display:inline-block;">
                    <span style="font-size:60px;">📁</span>
                    <p>Open Project Archives</p>
                </div>
            </div>
            <div id="carousel-anchor"></div>
        `);

        document.getElementById('folder-trigger').onclick = () => {
            Carousel.init(['assets/proj1.png', 'assets/proj2.png', 'assets/proj3.png']);
        };
    });
});