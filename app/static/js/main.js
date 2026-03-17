document.addEventListener('DOMContentLoaded', () => {

  // ── LOADER ────────────────────────────────────────────────
  const loader        = document.getElementById('loader');
  const loaderBar     = document.querySelector('.loader-bar');
  const loaderCounter = document.querySelector('.loader-counter');

  let count = 0;
  const interval = setInterval(() => {
    count += Math.floor(Math.random() * 12) + 3;
    if (count >= 100) {
      count = 100;
      clearInterval(interval);
      setTimeout(() => {
        loader.classList.add('hidden');
        document.body.style.overflow = '';
        revealHero();
      }, 400);
    }
    loaderCounter.textContent = String(count).padStart(2, '0');
    loaderBar.style.width = count + '%';
  }, 60);

  document.body.style.overflow = 'hidden';

  // ── SCROLL REVEAL ─────────────────────────────────────────
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  // ── HERO REVEAL ───────────────────────────────────────────
  function revealHero() {
    document.querySelector('.hero-name')?.classList.add('visible');

    // FIX: added .motto-card so it animates in with the rest
    document.querySelectorAll('.hero-tagline, .hero-subtitle, .hero-cta, .motto-card, .hero-stats')
      .forEach((el, i) => {
        setTimeout(() => {
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
        }, 200 + i * 120);
      });
  }

  // FIX: added .motto-card to initial hidden state
  document.querySelectorAll('.hero-tagline, .hero-subtitle, .hero-cta, .motto-card, .hero-stats')
    .forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1)';
    });

  // ── COUNTING NUMBERS ──────────────────────────────────────
  function animateCount(el, target, suffix = '') {
    let current = 0;
    const step  = target / 60;
    const timer = setInterval(() => {
      current = Math.min(current + step, target);
      el.textContent = Math.floor(current) + suffix;
      if (current >= target) clearInterval(timer);
    }, 20);
  }

  const countObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        animateCount(e.target, parseInt(e.target.dataset.target), e.target.dataset.suffix || '');
        countObserver.unobserve(e.target);
      }
    });
  });
  document.querySelectorAll('[data-target]').forEach(el => countObserver.observe(el));

  // ── MAGNETIC BUTTONS ──────────────────────────────────────
  document.querySelectorAll('.btn-primary').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const r = btn.getBoundingClientRect();
      const x = e.clientX - r.left - r.width  / 2;
      const y = e.clientY - r.top  - r.height / 2;
      btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px) translateY(-2px)`;
    });
    btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
  });

  // ── ACTIVE NAV HIGHLIGHT ──────────────────────────────────
  // FIX: removed dead first observer that called .observe with no argument
  const navLinks = document.querySelectorAll('.nav-links a');

  document.querySelectorAll('section[id]').forEach(s => {
    new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          navLinks.forEach(a => {
            a.style.color = '';
            if (
              a.getAttribute('href') === '#'  + e.target.id ||
              a.getAttribute('href') === '/#' + e.target.id
            ) {
              a.style.color = 'var(--accent)';
            }
          });
        }
      });
    }, { threshold: 0.5 }).observe(s);
  });

  // ── PARALLAX BG NUMBER ────────────────────────────────────
  const bgNum = document.querySelector('.hero-bg-number');
  if (bgNum) {
    window.addEventListener('scroll', () => {
      bgNum.style.transform = `translateY(calc(-50% + ${window.scrollY * 0.3}px))`;
    });
  }

  // ── TYPING EFFECT ─────────────────────────────────────────
  const typingEl = document.querySelector('.typing-text');
  if (typingEl) {
    const words = ['Developer', 'Designer', 'Builder', 'Creator'];
    let wordIdx = 0, charIdx = 0, deleting = false;

    function type() {
      const word = words[wordIdx];
      if (deleting) {
        typingEl.textContent = word.substring(0, charIdx--);
        if (charIdx < 0) {
          deleting = false;
          wordIdx = (wordIdx + 1) % words.length;
          setTimeout(type, 400);
          return;
        }
      } else {
        typingEl.textContent = word.substring(0, charIdx++);
        if (charIdx > word.length) {
          deleting = true;
          setTimeout(type, 1800);
          return;
        }
      }
      setTimeout(type, deleting ? 60 : 100);
    }
    setTimeout(type, 1000);
  }

  // ── HAMBURGER MENU ────────────────────────────────────────
  const hamburger   = document.getElementById('hamburger');
  const mobileNav   = document.getElementById('mobileNav');
  const mobileClose = document.getElementById('mobileNavClose');
  const iconMenu    = hamburger?.querySelector('.icon-menu');
  const iconClose   = hamburger?.querySelector('.icon-close');
  const mobileLinks = document.querySelectorAll('.mobile-nav-item');

  function openNav() {
    mobileNav.classList.add('open');
    iconMenu.style.display  = 'none';
    iconClose.style.display = 'block';
    document.body.style.overflow = 'hidden';
  }

  function closeNav() {
    mobileNav.classList.remove('open');
    iconMenu.style.display  = 'block';
    iconClose.style.display = 'none';
    document.body.style.overflow = '';
  }

  hamburger?.addEventListener('click', () => {
    mobileNav.classList.contains('open') ? closeNav() : openNav();
  });

  mobileClose?.addEventListener('click', closeNav);

  mobileLinks.forEach(link => {
    link.addEventListener('click', closeNav);
  });

  mobileNav?.addEventListener('click', (e) => {
    if (e.target === mobileNav) closeNav();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeNav();
  });

});