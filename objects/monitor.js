/**
 * Object: Monitor
 * Theme: Workstation Terminal (theme-monitor)
 * Logic: Features an improved terminal-style UI with glowing glass buttons
 */
document.getElementById('hotspot-monitor').addEventListener('click', () => {
    // 1. Play workstation narration
    App.playAudio('monitor.mp3');
    
    // 2. Trigger cinematic zoom into the screen
    Transitions.zoomToObject('monitor', () => {
        // 3. Render the enhanced Terminal UI
        Popup.render(`
            <div class="terminal-world">
                <div class="terminal-header">
                    <span class="status-dot"></span>
                    <h1 class="terminal-title">SYSTEM_CORE_V1.0</h1>
                </div>
                
                <div class="terminal-body">
                    <p class="typing-text">Ohh… you want to see what I do?</p>
                    <p class="typing-text delay">Let me show you.</p>
                </div>

                <div class="console-nav">
                    <button class="glass-btn" onclick="window.location.href='scenes/project.html#projects'">
                        <span class="btn-id">01</span>
                        <span class="btn-label">PROJECTS</span>
                        <div class="btn-glow"></div>
                    </button>
                    
                    <button class="glass-btn" onclick="window.location.href='scenes/skills.html#skills'">
                        <span class="btn-id">02</span>
                        <span class="btn-label">SKILLS & EXP</span>
                        <div class="btn-glow"></div>
                    </button>
                    
                    <button class="glass-btn" onclick="window.location.href='scenes/journey.html#journey'">
                        <span class="btn-id">03</span>
                        <span class="btn-label">JOURNEY</span>
                        <div class="btn-glow"></div>
                    </button>
                </div>
            </div>
        `);
        
        // Add GSAP hover animations to the new buttons
        document.querySelectorAll('.glass-btn').forEach(btn => {
            btn.addEventListener('mouseenter', () => {
                gsap.to(btn, { scale: 1.05, backgroundColor: 'rgba(92, 225, 230, 0.1)', duration: 0.3 });
                gsap.to(btn.querySelector('.btn-glow'), { opacity: 1, duration: 0.3 });
            });
            btn.addEventListener('mouseleave', () => {
                gsap.to(btn, { scale: 1, backgroundColor: 'rgba(255, 255, 255, 0.05)', duration: 0.3 });
                gsap.to(btn.querySelector('.btn-glow'), { opacity: 0, duration: 0.3 });
            });
        });
    });
});