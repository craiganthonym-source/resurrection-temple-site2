/* ══════════════════════════════════════════════════════════════
   RESURRECTION TEMPLE — MAIN JS
   ══════════════════════════════════════════════════════════════ */

'use strict';

// ── MOBILE NAV ──────────────────────────────────────────────────────
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobile-nav');

if (hamburger && mobileNav) {
  hamburger.addEventListener('click', () => {
    mobileNav.classList.toggle('open');
    hamburger.textContent = mobileNav.classList.contains('open') ? '✕' : '☰';
  });
  document.addEventListener('click', e => {
    if (!hamburger.contains(e.target) && !mobileNav.contains(e.target)) {
      mobileNav.classList.remove('open');
      hamburger.textContent = '☰';
    }
  });
}

// ── ACTIVE NAV ──────────────────────────────────────────────────────
(function setActiveNav() {
  const path = window.location.pathname;
  document.querySelectorAll('.nav-link, .mobile-nav-item').forEach(link => {
    const href = link.getAttribute('href') || '';
    if (
      (path === '/' && href === '/') ||
      (path !== '/' && href !== '/' && path.startsWith(href.replace(/\.html$/, '')))
    ) {
      link.classList.add('active');
    }
  });
})();

// ── REVEAL ON SCROLL ────────────────────────────────────────────────
(function initReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
  }, { threshold: 0.12 });
  els.forEach(el => obs.observe(el));
})();

// ── TABS ────────────────────────────────────────────────────────────
document.querySelectorAll('.tab-bar').forEach(bar => {
  bar.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.tab;
      const parent = btn.closest('[data-tabs]') || document;
      parent.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      parent.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      const panel = parent.querySelector(`[data-panel="${target}"]`);
      if (panel) panel.classList.add('active');
    });
  });
});

// ── TOAST ───────────────────────────────────────────────────────────
window.showToast = function(msg, type = 'success') {
  let toast = document.getElementById('site-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'site-toast';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.className = `toast toast-${type}`;
  setTimeout(() => toast.classList.add('show'), 10);
  setTimeout(() => toast.classList.remove('show'), 3800);
};

// ── FORM SUBMISSION ─────────────────────────────────────────────────
document.querySelectorAll('form[data-form]').forEach(form => {
  form.addEventListener('submit', async e => {
    e.preventDefault();
    const btn = form.querySelector('[type=submit]');
    const originalText = btn.textContent;
    const successEl = form.querySelector('.form-success');
    const errorEl = form.querySelector('.form-error');

    btn.textContent = 'Sending...';
    btn.disabled = true;
    if (successEl) successEl.classList.remove('show');
    if (errorEl) errorEl.classList.remove('show');

    const formType = form.dataset.form;
    const data = Object.fromEntries(new FormData(form));

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ formType, ...data })
      });
      const json = await res.json();
      if (res.ok && json.ok) {
        if (successEl) successEl.classList.add('show');
        showToast('Message sent successfully.');
        form.reset();
      } else {
        throw new Error(json.error || 'Submission failed');
      }
    } catch (err) {
      if (errorEl) { errorEl.textContent = 'Something went wrong. Please call (626) 479-1082 or email directly.'; errorEl.classList.add('show'); }
      showToast('Submission failed. Please try again.', 'error');
    } finally {
      btn.textContent = originalText;
      btn.disabled = false;
    }
  });
});

// ── SMOOTH SCROLL TO ANCHOR ─────────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ── HEADER SCROLL EFFECT ─────────────────────────────────────────────
(function headerScroll() {
  const header = document.querySelector('.site-header');
  if (!header) return;
  window.addEventListener('scroll', () => {
    header.style.borderBottomColor = window.scrollY > 40 ? 'rgba(201,168,76,0.35)' : 'rgba(201,168,76,0.22)';
  }, { passive: true });
})();
