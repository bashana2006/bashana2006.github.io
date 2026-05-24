// ─── LOADER ────────────────────────────────────────────────
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader').classList.add('hidden');
    initReveal();
    initCounters();
  }, 150);
});

// ─── NAVBAR ────────────────────────────────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
  document.getElementById('back-to-top').classList.toggle('visible', window.scrollY > 400);
});

// ─── HAMBURGER ─────────────────────────────────────────────
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobileNav');
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  mobileNav.classList.toggle('open');
});
function closeMobileNav() {
  hamburger.classList.remove('active');
  mobileNav.classList.remove('open');
}

// ─── THEME & LOGO ──────────────────────────────────────────
const themeToggle = document.getElementById('themeToggle');
const dynamicLogos = document.querySelectorAll('.dynamic-logo');

function getCurrentTheme() {
  return document.documentElement.getAttribute('data-theme') || 'dark';
}

function updateThemeIcon() {
  themeToggle.textContent = getCurrentTheme() === 'light' ? '☀' : '☾';
}

function updateLogos() {
  const theme = getCurrentTheme();
  dynamicLogos.forEach(img => {
    const lightSrc = img.dataset.logoLight;
    const darkSrc = img.dataset.logoDark;
    img.src = theme === 'dark' ? darkSrc : lightSrc;
  });
}

themeToggle.addEventListener('click', () => {
  const isLight = getCurrentTheme() === 'light';
  document.documentElement.setAttribute('data-theme', isLight ? 'dark' : 'light');
  updateThemeIcon();
  updateLogos();
});

// ─── PAGE NAVIGATION ─────────────────────────────────────
function showPage(page) {
  document.querySelectorAll('.page-section').forEach(s => s.classList.remove('active'));
  const pageMap = {
    'home': 'page-home',
    'about': 'page-about',
    'portfolio': 'page-portfolio',
    'services': 'page-services',
    'case-studies': 'page-case-studies',
    'blog': 'page-blog',
    'contact': 'page-contact'
  };
  const target = document.getElementById(pageMap[page] || 'page-home');
  if (target) {
    target.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
      initReveal();
      if (page === 'home') initCounters();
    }, 50);
  }
  closeMobileNav();
}

// ─── SCROLL REVEAL ─────────────────────────────────────────
function initReveal() {
  const reveals = document.querySelectorAll('.reveal:not(.visible)');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });
  reveals.forEach(el => observer.observe(el));
}

// ─── COUNTER ANIMATION ─────────────────────────────────────
function initCounters() {
  document.querySelectorAll('[data-count]').forEach(el => {
    const target = parseInt(el.getAttribute('data-count'), 10);
    let current = 0;
    const step = target / 60;
    const timer = setInterval(() => {
      current = Math.min(current + step, target);
      el.textContent = Math.floor(current) + (target === 98 ? '' : '+');
      if (current >= target) clearInterval(timer);
    }, 25);
  });
}

// ─── FILTER TABS ───────────────────────────────────────────
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('filter-btn')) {
    const parent = e.target.closest('section') || document;
    parent.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    e.target.classList.add('active');
    const filter = e.target.getAttribute('data-filter');
    document.querySelectorAll('.project-card[data-category]').forEach(card => {
      card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
      if (filter === 'all' || card.getAttribute('data-category') === filter) {
        card.style.opacity = '1'; card.style.transform = '';
      } else {
        card.style.opacity = '0.2'; card.style.transform = 'scale(0.97)';
      }
    });
  }
});

// ─── TESTIMONIALS SLIDER ───────────────────────────────────
let testimonialIndex = 0;
function scrollTestimonials(dir) {
  const track = document.getElementById('testimonialsTrack');
  const cards = track.querySelectorAll('.testimonial-card');
  testimonialIndex = Math.max(0, Math.min(testimonialIndex + dir, cards.length - 2));
  const cardWidth = cards[0].offsetWidth + 24;
  track.style.transform = `translateX(-${testimonialIndex * cardWidth}px)`;
}

// ─── CONTACT FORM ──────────────────────────────────────────
function handleFormSubmit(e) {
  e.preventDefault();
  const btn = document.getElementById('submitBtn');
  btn.textContent = 'Sending…';
  btn.disabled = true;

  const form = e.target;
  const data = new FormData(form);
  const firstName = data.get('firstName') || '';
  const lastName = data.get('lastName') || '';
  const email = data.get('email') || '';
  const service = data.get('service') || 'Not specified';
  const budget = data.get('budget') || 'Not specified';
  const message = data.get('message') || '';

  const body = `Name: ${firstName} ${lastName}\r\nEmail: ${email}\r\nService: ${service}\r\nBudget: ${budget}\r\nMessage: ${message}`;
  const subject = encodeURIComponent(`New Project Enquiry from ${firstName} ${lastName}`);
  const bodyEncoded = encodeURIComponent(body);
  const mailtoLink = `mailto:Bashana2006@gmail.com?subject=${subject}&body=${bodyEncoded}`;

  window.location.href = mailtoLink;

  setTimeout(() => {
    document.getElementById('contactForm').style.display = 'none';
    document.getElementById('formSuccess').style.display = 'block';
  }, 500);
}

// ─── LOGO FALLBACK ─────────────────────────────────────────
document.querySelectorAll('.dynamic-logo').forEach(img => {
  img.addEventListener('error', () => {
    img.style.display = 'none';
  });
});

// ─── INIT ─────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  updateThemeIcon();
  updateLogos();
  setTimeout(() => { initReveal(); initCounters(); }, 100);
});
