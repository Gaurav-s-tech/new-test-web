// contact.js — Contact form handler (Web3Forms)
var _cfg = { endpoint: 'https://api.web3forms.com/submit', id: '71a3e283-4447-4e66-ab76-18ae12f40eaf' };
var _lastSubmit = 0;
var COOLDOWN_MS = 15000;

var LIMITS = { name: 100, email: 254, subject: 150, message: 2000 };

function sanitize(str, max) {
    return String(str).slice(0, max).trim();
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

async function handleContact(e) {
    e.preventDefault();
    var form = e.target;
    var btn  = form.querySelector('.submit-btn');
    var orig = btn.textContent;

    // Honeypot: bots fill hidden fields — reject silently
    var honey = form.querySelector('[name="_honey"]');
    if (honey && honey.checked) {
        btn.textContent = 'Message Sent ✓';
        form.reset();
        return;
    }

    // Client-side rate limit — prevent rapid resubmission
    var now = Date.now();
    if (now - _lastSubmit < COOLDOWN_MS) {
        var wait = Math.ceil((COOLDOWN_MS - (now - _lastSubmit)) / 1000);
        btn.textContent = 'Please wait ' + wait + 's';
        setTimeout(function () { btn.textContent = orig; }, 2500);
        return;
    }

    var name    = sanitize(document.getElementById('contact-name').value,    LIMITS.name);
    var email   = sanitize(document.getElementById('contact-email').value,   LIMITS.email);
    var subject = sanitize(document.getElementById('contact-subject').value, LIMITS.subject) || 'Portfolio Contact';
    var message = sanitize(document.getElementById('contact-message').value, LIMITS.message);

    if (!name || !email || !message) {
        btn.textContent = 'Fill required fields';
        setTimeout(function () { btn.textContent = orig; }, 2500);
        return;
    }

    if (!isValidEmail(email)) {
        btn.textContent = 'Invalid email address';
        setTimeout(function () { btn.textContent = orig; }, 2500);
        return;
    }

    btn.textContent = 'Sending…';
    btn.disabled = true;
    _lastSubmit = Date.now();

    try {
        var res  = await fetch(_cfg.endpoint, {
            method:  'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body:    JSON.stringify({ access_key: _cfg.id, from_name: 'Portfolio Contact', name: name, email: email, subject: subject, message: message })
        });
        var data = await res.json();

        if (data.success) {
            btn.textContent = 'Message Sent ✓';
            form.reset();
            setTimeout(function () { btn.textContent = orig; btn.disabled = false; }, 4000);
        } else {
            throw new Error(data.message || 'Submission failed');
        }
    } catch (err) {
        btn.textContent = 'Failed — Try Again';
        btn.disabled = false;
        setTimeout(function () { btn.textContent = orig; }, 3000);
    }
}
