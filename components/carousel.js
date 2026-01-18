const Carousel = {
    init(images) {
        let idx = 0;
        const html = `
            <div id="pc-gallery" style="margin-top:25px; overflow:hidden; border-radius:10px; border:1px solid var(--accent)">
                <div id="slide-track" style="display:flex; transition: transform 0.6s cubic-bezier(0.23, 1, 0.32, 1);">
                    ${images.map(img => `<img src="${img}" style="min-width:100%; height:350px; object-fit:cover;">`).join('')}
                </div>
            </div>
            <div style="text-align:center; margin-top:15px;">
                <button id="prev-btn" class="nav-btn">Prev</button>
                <button id="next-btn" class="nav-btn">Next</button>
            </div>
        `;
        document.getElementById('carousel-anchor').innerHTML = html;
        
        const track = document.getElementById('slide-track');
        document.getElementById('next-btn').onclick = () => {
            idx = (idx + 1) % images.length;
            track.style.transform = `translateX(-${idx * 100}%)`;
        };
        document.getElementById('prev-btn').onclick = () => {
            idx = (idx - 1 + images.length) % images.length;
            track.style.transform = `translateX(-${idx * 100}%)`;
        };
    }
};