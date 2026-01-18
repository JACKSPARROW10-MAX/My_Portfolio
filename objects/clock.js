document.getElementById('hotspot-clock').addEventListener('click', () => {
    App.showPopup(
        "TEMPORAL DATA", 
        "Synchronized to the global grid. In development, every second is a data point, and every millisecond of performance counts.",
        "clock.mp3",
        "theme-clock"
    );
});