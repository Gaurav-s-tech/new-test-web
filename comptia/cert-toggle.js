// cert-toggle.js — Shared certification panel toggle for CompTIA and Microsoft pages
function toggleCert(certId) {
    document.querySelectorAll('.cert-select-card').forEach(function (card) {
        card.classList.remove('active');
        card.setAttribute('aria-selected', 'false');
    });

    document.querySelectorAll('.cert-panel').forEach(function (panel) {
        panel.classList.remove('open');
    });

    var activeCard = document.getElementById('cert-' + certId);
    activeCard.classList.add('active');
    activeCard.setAttribute('aria-selected', 'true');

    var panel = document.getElementById('panel-' + certId);
    panel.classList.add('open');

    setTimeout(function () {
        if (typeof ScrollTrigger !== 'undefined') {
            ScrollTrigger.refresh();
        }

        var smoother = typeof ScrollSmoother !== 'undefined' && ScrollSmoother.get ? ScrollSmoother.get() : null;
        if (smoother) {
            smoother.scrollTo(panel, true, 'top top+=80');
        } else {
            panel.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, 150);
}

// Keyboard accessibility for cert selector cards
document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.cert-select-card').forEach(function (card) {
        card.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                card.click();
            }
        });
    });
});
