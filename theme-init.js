// theme-init.js — Runs before paint to prevent theme flash
// Shared across all pages
(function () {
    // Disable browser scroll restoration early so ScrollSmoother always starts at top
    if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
    }

    var s = localStorage.getItem('theme');
    var dark = s === 'dark' || (s === null && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
    if (dark) {
        // Add class to <html> before first paint — CSS handles all color values.
        // Never use setProperty here: inline styles outrank class rules and would
        // permanently block the class-based toggle in script.js.
        document.documentElement.classList.add('theme-dark');
    }
})();
