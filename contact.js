// contact.js — Contact form handler
function handleContact(e) {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const subject = form.subject.value || 'Portfolio Contact';
    const message = form.message.value;
    const mailto = `mailto:gauravsinghcan98@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent('From: ' + name + ' (' + email + ')\n\n' + message)}`;
    window.location.href = mailto;
}
