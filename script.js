/* ===========================
   NayePankh Foundation
   script.js
=========================== */

// ── LOADER ──────────────────────────────────
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader').classList.add('hide');
    document.body.classList.add('hero-active');
    // Trigger first reveal
    checkReveal();
  }, 1200);
});

// ── DARK MODE ────────────────────────────────
const darkBtn = document.getElementById('darkBtn');
const savedTheme = localStorage.getItem('theme');

if (savedTheme === 'dark') {
  document.body.classList.add('dark');
  darkBtn.textContent = '☀️';
}

darkBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  const isDark = document.body.classList.contains('dark');
  darkBtn.textContent = isDark ? '☀️' : '🌙';
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

// ── HEADER SCROLL ────────────────────────────
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
  if (window.scrollY > 80) {
    header.classList.add('scrolled');
    document.body.classList.remove('hero-active');
  } else {
    header.classList.remove('scrolled');
    document.body.classList.add('hero-active');
  }

  // Back to top button
  const backTop = document.getElementById('backTop');
  if (window.scrollY > 400) {
    backTop.classList.add('visible');
  } else {
    backTop.classList.remove('visible');
  }

  checkReveal();
});

// ── SMOOTH NAV ───────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    // Close mobile nav if open
    document.getElementById('mobileNav').classList.remove('open');
    target.scrollIntoView({ behavior: 'smooth' });
  });
});

// ── HAMBURGER MENU ───────────────────────────
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobileNav');

hamburger.addEventListener('click', () => {
  mobileNav.classList.toggle('open');
  hamburger.textContent = mobileNav.classList.contains('open') ? '✕' : '☰';
});

// ── BACK TO TOP ──────────────────────────────
document.getElementById('backTop').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ── REVEAL ON SCROLL ─────────────────────────
function checkReveal() {
  const reveals = document.querySelectorAll('.reveal');
  reveals.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 80) {
      el.classList.add('visible');
    }
  });
}

// ── COUNTER ANIMATION ────────────────────────
function formatNumber(n) {
  if (n >= 100000) return (n / 100000).toFixed(0) + 'L';
  return n.toLocaleString('en-IN');
}

function animateCounters() {
  const counters = document.querySelectorAll('.stat-number');
  counters.forEach(counter => {
    if (counter.dataset.animated) return;
    const rect = counter.getBoundingClientRect();
    if (rect.top < window.innerHeight - 40) {
      counter.dataset.animated = 'true';
      const target = parseInt(counter.dataset.target, 10);
      const duration = 2000;
      const start = performance.now();

      function update(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        // Ease out cubic
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.round(eased * target);
        counter.textContent = formatNumber(current);
        if (progress < 1) requestAnimationFrame(update);
      }

      requestAnimationFrame(update);
    }
  });
}

window.addEventListener('scroll', animateCounters);

// ── EMAIL SUBSCRIBE ──────────────────────────
const emailBtn = document.querySelector('.email-form button');
if (emailBtn) {
  emailBtn.addEventListener('click', () => {
    const input = document.querySelector('.email-form input');
    const val = input.value.trim();
    if (!val || !val.includes('@')) {
      input.style.borderColor = 'var(--accent)';
      input.placeholder = 'Please enter a valid email';
      return;
    }
    emailBtn.textContent = '✓ Done!';
    emailBtn.style.background = '#1a6b4a';
    input.value = '';
    input.placeholder = 'Thanks for joining! 🎉';
    setTimeout(() => {
      emailBtn.textContent = 'Subscribe';
      emailBtn.style.background = '';
      input.placeholder = 'Your email address';
    }, 3000);
  });
}

// ── ACTIVE NAV HIGHLIGHT ─────────────────────
const sections = document.querySelectorAll('section[id], footer[id]');
const navLinks = document.querySelectorAll('#nav a, .mobile-nav a');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + entry.target.id) {
          link.classList.add('active');
        }
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(section => observer.observe(section));

// ── PILLAR HOVER TILT ────────────────────────
document.querySelectorAll('.pillar').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 8;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -8;
    card.style.transform = `translateY(-8px) rotateX(${y}deg) rotateY(${x}deg)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

// ── INIT ─────────────────────────────────────
checkReveal();
animateCounters();
