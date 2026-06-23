/* ================================================
   BASHANA MIHINDUPRIYA — PORTFOLIO
   Interactions & motion
   ================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Nav scroll state ---------- */
  const navWrapper = document.getElementById('nav-wrapper');
  const onScroll = () => {
    if (window.scrollY > 12) navWrapper.classList.add('scrolled');
    else navWrapper.classList.remove('scrolled');
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---------- Mobile menu toggle ---------- */
  const navToggle = document.getElementById('nav-toggle');
  const navCollapse = document.getElementById('nav-collapse');

  const closeMenu = () => {
    navToggle.classList.remove('open');
    navCollapse.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  };

  navToggle.addEventListener('click', () => {
    const isOpen = navCollapse.classList.toggle('open');
    navToggle.classList.toggle('open', isOpen);
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  document.querySelectorAll('[data-link]').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  /* ---------- Active nav link on scroll ---------- */
  const sections = ['home', 'about', 'work', 'contact']
    .map(id => document.getElementById(id))
    .filter(Boolean);
  const navLinks = Array.from(document.querySelectorAll('.nav-link'));

  const setActive = (id) => {
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
    });
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) setActive(entry.target.id);
    });
  }, { rootMargin: '-45% 0px -45% 0px', threshold: 0 });

  sections.forEach(sec => sectionObserver.observe(sec));

  /* ---------- Scroll-reveal animations ---------- */
  const animatedEls = document.querySelectorAll('[data-animate]');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const delay = parseInt(el.getAttribute('data-delay') || '0', 10);
        setTimeout(() => el.classList.add('in-view'), delay);
        revealObserver.unobserve(el);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

  animatedEls.forEach(el => revealObserver.observe(el));

  /* ---------- Skill bar fill on view ---------- */
  const skillCards = document.querySelectorAll('.skill-card');

  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const card = entry.target;
        const fill = card.querySelector('.skill-fill');
        const progress = card.getAttribute('data-progress') || '0';
        requestAnimationFrame(() => {
          fill.style.width = `${progress}%`;
        });
        skillObserver.unobserve(card);
      }
    });
  }, { threshold: 0.3 });

  skillCards.forEach(card => skillObserver.observe(card));

  /* ---------- Hero glass-card subtle parallax (desktop only) ---------- */
  const heroVisual = document.querySelector('.hero-visual');
  if (heroVisual && window.matchMedia('(min-width: 1025px)').matches) {
    const floatCards = heroVisual.querySelectorAll('.float-card');
    heroVisual.addEventListener('mousemove', (e) => {
      const rect = heroVisual.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      floatCards.forEach((card, i) => {
        const depth = (i + 1) * 6;
        card.style.transform = `translate(${px * depth}px, ${py * depth}px)`;
      });
    });
    heroVisual.addEventListener('mouseleave', () => {
      floatCards.forEach(card => { card.style.transform = ''; });
    });
  }

  /* ---------- Contact form (front-end only — no backend wired up) ---------- */
  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const subject = form.subject.value.trim();
      const message = form.message.value.trim();

      if (!name || !email || !subject || !message) {
        status.textContent = 'Please fill in every field before sending.';
        status.style.color = '#D14343';
        return;
      }

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        status.textContent = 'Please enter a valid email address.';
        status.style.color = '#D14343';
        return;
      }

      // No backend connected yet — simulate a successful send.
      // Wire this up to a real email service (e.g. Formspree, EmailJS,
      // or a small serverless function) to deliver messages for real.
      const submitBtn = form.querySelector('.form-submit');
      submitBtn.disabled = true;
      status.style.color = '#215EFD';
      status.textContent = 'Sending...';

      setTimeout(() => {
        status.textContent = `Thanks, ${name.split(' ')[0]} — your message is ready to send. Connect a form backend to deliver it.`;
        submitBtn.disabled = false;
        form.reset();
      }, 900);
    });
  }

});
