// GSAP ScrollSmoother
gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

const smoother = ScrollSmoother.create({
    wrapper: '#smooth-wrapper',
    content: '#smooth-content',
    smooth: 1.5,       // seconds it takes to catch up — higher = smoother
    effects: true,     // enables data-speed / data-lag parallax attributes
    smoothTouch: 0.1,  // light smoothing on touch devices
});

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initFontSize();
    initHamburger();
    initScrollButton();
    initLanyardSync();
    initBackToTop();
    initHeroLetterHover();
});

// 1. Theme Logic
function initTheme() {
    const themeBtn = document.getElementById('theme-btn');
    if (!themeBtn) return;

    const root = document.documentElement;
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    let isDarkMode = localStorage.getItem('theme') === 'dark' || (localStorage.getItem('theme') === null && prefersDark);

    // One class toggle on <html> is the single atomic operation that drives
    // every theme-dependent CSS variable simultaneously. All CSS transitions
    // start in the same browser paint cycle — zero timing offset possible.
    const applyTheme = () => {
        root.classList.toggle('theme-dark', isDarkMode);
        themeBtn.innerText = isDarkMode ? "☀ LIGHT" : "☾ DARK";
    };

    applyTheme();

    themeBtn.addEventListener('click', () => {
        isDarkMode = !isDarkMode;
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
        applyTheme();
    });
}

// 2. Font Size Logic
function initFontSize() {
    const fontBtn = document.getElementById('font-btn');
    if (!fontBtn) return;

    let isLargeFont = false;

    fontBtn.addEventListener('click', () => {
        isLargeFont = !isLargeFont;
        if (isLargeFont) {
            document.body.style.fontSize = "18px";
            fontBtn.innerText = "AA ▲";
        } else {
            document.body.style.fontSize = "16px";
            fontBtn.innerText = "AA ▼";
        }
    });
}

// 3. Hamburger / Mobile Nav
function initHamburger() {
    const hamburger = document.getElementById('hamburger-btn');
    const navLinks = document.getElementById('nav-links');
    if (!hamburger || !navLinks) return;

    hamburger.addEventListener('click', () => {
        const isOpen = navLinks.classList.toggle('nav-open');
        hamburger.classList.toggle('is-active', isOpen);
        hamburger.setAttribute('aria-expanded', isOpen);
    });

    // Close menu when a link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('nav-open');
            hamburger.classList.remove('is-active');
            hamburger.setAttribute('aria-expanded', 'false');
        });
    });
}

// 4. Smooth Scroll (only on pages that have .scroll-container)
function initScrollButton() {
    const scrollBtn = document.querySelector('.scroll-container');
    if (!scrollBtn) return;

    scrollBtn.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        if (!targetElement) return;

        // ScrollSmoother needs its own scrollTo — scrollIntoView won't work
        if (typeof smoother !== 'undefined' && smoother && smoother.scrollTo) {
            smoother.scrollTo(targetElement, true);
        } else {
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }
    });
}

// 5. Lanyard Iframe Background Sync (no-op — transparency handles it)
// The iframe body and Three.js canvas both have transparent backgrounds,
// so .hero-lanyard-panel { background-color: var(--bg-color) } shows through
// in perfect sync with the rest of the page. No postMessage needed.
function initLanyardSync() {}

// 6. Hero Letter Hover — wraps each character in a span for per-letter colour on hover
function initHeroLetterHover() {
    document.querySelectorAll('.hero-title .row').forEach(row => {
        const text = row.textContent;
        row.innerHTML = text.split('').map(char =>
            char === ' '
                ? '<span class="hero-letter hero-space" aria-hidden="true"> </span>'
                : `<span class="hero-letter">${char}</span>`
        ).join('');
    });
}

// 7. Back to Top Button
function initBackToTop() {
    const btn = document.getElementById('back-to-top');
    if (!btn) return;

    // ScrollSmoother moves #smooth-content via CSS transforms, so actual
    // scroll position lives on window — not wrapper.scrollTop.
    const toggleVisibility = () => {
        if (window.scrollY > 300) {
            btn.classList.add('visible');
        } else {
            btn.classList.remove('visible');
        }
    };

    window.addEventListener('scroll', toggleVisibility, { passive: true });
    toggleVisibility();

    btn.addEventListener('click', () => {
        if (typeof smoother !== 'undefined' && smoother && smoother.scrollTo) {
            smoother.scrollTo(0, true);
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    });
}