/* ═══════════════════════════════════════════════
   AHMAD MAHMOOD — PORTFOLIO · script.js
═══════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ─── CUSTOM CURSOR ──────────────────────────── */
  const dot  = document.createElement('div');
  const ring = document.createElement('div');
  dot.className  = 'cursor-dot';
  ring.className = 'cursor-ring';
  document.body.append(dot, ring);

  let mx = 0, my = 0, rx = 0, ry = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    dot.style.left  = mx + 'px';
    dot.style.top   = my + 'px';
  });

  (function animRing() {
    rx += (mx - rx) * 0.14;
    ry += (my - ry) * 0.14;
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    requestAnimationFrame(animRing);
  })();

  // Scale ring on hover over interactive elements
  document.querySelectorAll('a, button, .expertise-item, .work-item, .award-item').forEach(el => {
    el.addEventListener('mouseenter', () => {
      ring.style.transform = 'translate(-50%,-50%) scale(1.8)';
      ring.style.borderColor = 'rgba(200,245,66,.6)';
    });
    el.addEventListener('mouseleave', () => {
      ring.style.transform = 'translate(-50%,-50%) scale(1)';
      ring.style.borderColor = 'rgba(200,245,66,.4)';
    });
  });

  /* ─── NAV SCROLL EFFECT ─────────────────────── */
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });

  /* ─── HAMBURGER MOBILE MENU ─────────────────── */
  const hamburger   = document.getElementById('hamburger');
  const mobileMenu  = document.getElementById('mobileMenu');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
    document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
  });

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  /* ─── SCROLL REVEAL ─────────────────────────── */
  const revealEls = document.querySelectorAll(
    '.timeline-item, .expertise-item, .work-item, .award-item, .review-card, .about-col, .section-title, .section-label, .contact-top, .contact-col'
  );

  revealEls.forEach(el => el.classList.add('reveal'));

  const observer = new IntersectionObserver(entries => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger siblings
        const siblings = entry.target.parentElement.querySelectorAll('.reveal');
        let idx = 0;
        siblings.forEach((s, si) => { if (s === entry.target) idx = si; });
        setTimeout(() => entry.target.classList.add('visible'), idx * 80);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

  revealEls.forEach(el => observer.observe(el));

  /* ─── REVIEW SLIDER ─────────────────────────── */
  const cards    = document.querySelectorAll('.review-card');
  const dots     = document.querySelectorAll('.dot');
  const prevBtn  = document.getElementById('prevReview');
  const nextBtn  = document.getElementById('nextReview');
  let current = 0;

  function goTo(n) {
    cards[current].classList.remove('active');
    dots[current].classList.remove('active');
    current = (n + cards.length) % cards.length;
    cards[current].classList.add('active');
    dots[current].classList.add('active');
  }

  prevBtn.addEventListener('click', () => goTo(current - 1));
  nextBtn.addEventListener('click', () => goTo(current + 1));
  dots.forEach((d, i) => d.addEventListener('click', () => goTo(i)));

  // Auto-advance
  setInterval(() => goTo(current + 1), 5000);

  /* ─── ACTIVE NAV LINK ON SCROLL ─────────────── */
  const sections = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('.nav-links a');

  const secObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navAnchors.forEach(a => {
          a.style.color = a.getAttribute('href') === '#' + entry.target.id
            ? 'var(--white)' : '';
        });
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => secObserver.observe(s));

  /* ─── SMOOTH BACK TO TOP ─────────────────────── */
  document.querySelector('.back-top')?.addEventListener('click', e => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

})();
