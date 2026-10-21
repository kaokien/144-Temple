// 144 Temple concept site. Demo only: forms never send data anywhere.
(function () {
  // Mobile nav
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('site-nav');
  function setNav(open) {
    toggle.setAttribute('aria-expanded', String(open));
    nav.classList.toggle('open', open);
  }
  toggle.addEventListener('click', function () {
    setNav(toggle.getAttribute('aria-expanded') !== 'true');
  });
  nav.addEventListener('click', function (e) {
    if (e.target.closest('a')) setNav(false);
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') setNav(false);
  });

  // Toast
  var toast = document.querySelector('.toast');
  var toastTimer;
  function showToast(msg) {
    toast.textContent = msg;
    toast.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toast.hidden = true; }, 3200);
  }

  // Posh links are placeholders until the real event URLs are dropped in
  document.querySelectorAll('[data-posh]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      if (a.getAttribute('href') !== '#') return;
      e.preventDefault();
      showToast('Demo: this button opens the event on Posh (posh.vip).');
    });
  });

  // Demo forms: validate locally, then show the success state. Nothing is sent.
  document.querySelectorAll('[data-demo-form]').forEach(function (form) {
    var success = form.nextElementSibling;
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      form.classList.add('was-validated');
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      form.hidden = true;
      success.hidden = false;
      success.focus({ preventScroll: true });
      form.reset();
      form.classList.remove('was-validated');
    });
    success.querySelector('[data-reset]').addEventListener('click', function () {
      success.hidden = true;
      form.hidden = false;
      var first = form.querySelector('input, select, textarea');
      if (first) first.focus();
    });
  });

  var year = document.querySelector('[data-year]');
  if (year) year.textContent = new Date().getFullYear();
})();
