/* =====================================================
   COMMON JS — 戚俊皓 | Personal Website v3
   ===================================================== */

document.addEventListener('DOMContentLoaded', function() {
  'use strict';

  // ─── Theme Toggle ────────────────────────────────
  const themeToggle = document.getElementById('themeToggle');
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
  if (themeToggle) updateThemeIcon(savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', function() {
      const current = document.documentElement.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.classList.add('theme-transitioning');
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
      updateThemeIcon(next);
      setTimeout(() => {
        document.documentElement.classList.remove('theme-transitioning');
      }, 350);
    });
  }

  function updateThemeIcon(theme) {
    if (!themeToggle) return;
    themeToggle.innerHTML = theme === 'dark'
      ? '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>'
      : '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>';
  }

  // ─── i18n System ─────────────────────────────────
  const TRANSLATIONS = {
    'nav.home':    { zh: '首页',   en: 'Home',    hant: '首頁' },
    'nav.music':   { zh: '音乐',   en: 'Music',   hant: '音樂' },
    'nav.travel':  { zh: '旅行',   en: 'Travel',  hant: '旅行' },
    'nav.photo':   { zh: '摄影',   en: 'Photo',   hant: '攝影' },
    'nav.sports':  { zh: '运动',   en: 'Sports',  hant: '運動' },
    'nav.resume':  { zh: '履历',   en: 'Resume',  hant: '履歷' },
    'nav.contact': { zh: '联系',   en: 'Contact', hant: '聯繫' }
  };

  let currentLang = localStorage.getItem('lang') || 'zh';

  function applyLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('lang', lang);
    document.documentElement.setAttribute('data-lang', lang);
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (TRANSLATIONS[key] && TRANSLATIONS[key][lang]) {
        el.textContent = TRANSLATIONS[key][lang];
      }
    });
    // Update lang-toggle active state
    document.querySelectorAll('.lang-item').forEach(item => {
      item.classList.toggle('active', item.dataset.lang === lang);
    });
  }

  // Lang toggle
  const langToggle = document.getElementById('langToggle');
  if (langToggle) {
    langToggle.addEventListener('click', function(e) {
      const item = e.target.closest('.lang-item');
      if (!item) return;
      const lang = item.dataset.lang;
      if (lang && lang !== currentLang) {
        applyLanguage(lang);
      }
    });
  }

  // Apply initial language
  applyLanguage(currentLang);

  // ─── Mobile Nav Toggle ───────────────────────────
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function() {
      this.classList.toggle('active');
      navLinks.classList.toggle('active');
    });
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', function() {
        navToggle.classList.remove('active');
        navLinks.classList.remove('active');
      });
    });
  }

  // ─── Navbar Scroll Effect ────────────────────────
  const navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', function() {
      navbar.classList.toggle('scrolled', window.scrollY > 20);
    }, { passive: true });
  }

  // ─── Back to Top ─────────────────────────────────
  const backToTop = document.getElementById('backToTop');
  if (backToTop) {
    window.addEventListener('scroll', function() {
      backToTop.classList.toggle('visible', window.scrollY > 400);
    }, { passive: true });
    backToTop.addEventListener('click', function() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ─── Scroll Reveal Animations ────────────────────
  const revealElements = document.querySelectorAll('.reveal');
  if (revealElements.length) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '40px' });
    revealElements.forEach(el => revealObserver.observe(el));
  }
});
