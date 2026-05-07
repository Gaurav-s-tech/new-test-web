// contact.js — Contact form handler
// Uses Web3Forms (web3forms.com) to deliver submissions to gauravsinghcan98@gmail.com.
// Replace WEB3FORMS_ACCESS_KEY below with the key emailed to you after visiting
// https://web3forms.com and entering gauravsinghcan98@gmail.com.
var WEB3FORMS_ACCESS_KEY = '71a3e283-4447-4e66-ab76-18ae12f40eaf';

async function handleContact(e) {
    e.preventDefault();
    var form = e.target;
    var btn  = form.querySelector('.submit-btn');
    var orig = btn.textContent;

    btn.textContent = 'Sending…';
    btn.disabled = true;

    var payload = {
        access_key: WEB3FORMS_ACCESS_KEY,
        from_name:  'Portfolio Contact Form',
        name:       document.getElementById('contact-name').value,
        email:      document.getElementById('contact-email').value,
        subject:    document.getElementById('contact-subject').value || 'Portfolio Contact',
        message:    document.getElementById('contact-message').value
    };

    try {
        var res  = await fetch('https://api.web3forms.com/submit', {
            method:  'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body:    JSON.stringify(payload)
        });
        var data = await res.json();

        if (data.success) {
            btn.textContent = 'Message Sent ✓';
            form.reset();
            setTimeout(function () {
                btn.textContent = orig;
                btn.disabled = false;
            }, 4000);
        } else {
            throw new Error(data.message || 'Submission failed');
        }
    } catch (err) {
        btn.textContent = 'Failed — Try Again';
        btn.disabled = false;
    }
}
