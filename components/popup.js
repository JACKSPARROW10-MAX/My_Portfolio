const Popup = {
    render(html) {
        App.container.innerHTML = html;
        // Fade in content items with stagger
        gsap.from(App.container.children, {
            y: 30, opacity: 0, stagger: 0.15, duration: 0.8, ease: "power2.out"
        });
    }
};