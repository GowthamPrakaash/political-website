/* ============================================================
   TAMIL PULIGAL KATCHI — main.js
   ============================================================ */

// ─── LOADER ────────────────────────────────────────────────
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader').classList.add('hidden');
    initAnimations();
  }, 1600);
});

// ─── NAV SCROLL ────────────────────────────────────────────
const navbar = document.getElementById('navbar');
let lastScroll = 0;
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  navbar.classList.toggle('scrolled', scrollY > 60);
  lastScroll = scrollY;
  highlightNav();
});

// ─── MOBILE NAV ────────────────────────────────────────────
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');
navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  const spans = navToggle.querySelectorAll('span');
  navLinks.classList.contains('open')
    ? (spans[0].style.transform = 'rotate(45deg) translate(5px,5px)',
       spans[1].style.opacity   = '0',
       spans[2].style.transform = 'rotate(-45deg) translate(5px,-5px)')
    : (spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; }));
});
navLinks.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  });
});

function highlightNav() {
  const sections = document.querySelectorAll('section[id]');
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 140) current = s.id;
  });
  document.querySelectorAll('.nav-link').forEach(l => {
    l.classList.toggle('active', l.dataset.section === current);
  });
}

// ─── HERO SLIDESHOW ────────────────────────────────────────
let currentSlide = 0;
const slides = document.querySelectorAll('.hero-slide');
const dots   = document.querySelectorAll('.slide-dot');

function goToSlide(n) {
  slides[currentSlide].classList.remove('active');
  dots[currentSlide].classList.remove('active');
  currentSlide = n;
  slides[currentSlide].classList.add('active');
  dots[currentSlide].classList.add('active');
}
setInterval(() => goToSlide((currentSlide + 1) % slides.length), 5000);

// ─── HERO PARTICLES ────────────────────────────────────────
function createParticles() {
  const container = document.getElementById('heroParticles');
  if (!container) return;
  for (let i = 0; i < 18; i++) {
    const p = document.createElement('div');
    p.style.cssText = `
      position:absolute;
      width:${6 + Math.random() * 10}px;
      height:${6 + Math.random() * 10}px;
      background:${Math.random() > 0.5 ? 'rgba(255,23,68,0.35)' : 'rgba(255,215,0,0.25)'};
      border-radius:50%;
      left:${Math.random() * 100}%;
      top:${Math.random() * 100}%;
      animation: particleDrift ${6 + Math.random() * 10}s ease-in-out infinite;
      animation-delay:${Math.random() * 6}s;
    `;
    container.appendChild(p);
  }
  const style = document.createElement('style');
  style.textContent = `
    @keyframes particleDrift {
      0%,100%{transform:translateY(0) scale(1); opacity:0.4;}
      33%{transform:translateY(-30px) scale(1.2); opacity:0.8;}
      66%{transform:translateY(15px) scale(0.8); opacity:0.5;}
    }
  `;
  document.head.appendChild(style);
}
createParticles();

// ─── COUNTDOWN ─────────────────────────────────────────────
function updateCountdown() {
  const target = new Date('2026-02-08T09:00:00+05:30');
  const now    = new Date();
  const diff   = target - now;
  if (diff <= 0) {
    document.getElementById('eventCountdown').innerHTML = '<div style="color:#e53935;font-weight:900;font-family:Montserrat">நிகழ்வு நடந்துவிட்டது! Event Has Passed!</div>';
    return;
  }
  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff % 86400000) / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);
  const fmt = n => String(n).padStart(2, '0');
  document.getElementById('cDays').textContent  = fmt(d);
  document.getElementById('cHours').textContent = fmt(h);
  document.getElementById('cMins').textContent  = fmt(m);
  document.getElementById('cSecs').textContent  = fmt(s);
}
updateCountdown();
setInterval(updateCountdown, 1000);

// ─── SCROLL ANIMATIONS ─────────────────────────────────────
function initAnimations() {
  const targets = [
    '.pillar-card', '.event-card', '.wing-card', '.ds-card',
    '.leader-card', '.gallery-item', '.stat-item', '.download-item'
  ];
  const all = document.querySelectorAll(targets.join(','));
  all.forEach(el => el.classList.add('fade-in-up'));

  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
    });
  }, { threshold: 0.12 });
  all.forEach(el => io.observe(el));
}

// ─── OTP SIMULATION ────────────────────────────────────────
function sendOTP() {
  const phoneInput = document.querySelector('.phone-input input');
  const val = phoneInput ? phoneInput.value.trim() : '';
  if (!val) { showToast('கைபேசி எண் உள்ளிடவும் / Enter phone number', 'error'); return; }
  const otpGroup = document.getElementById('otpGroup');
  if (otpGroup) {
    otpGroup.style.display = 'block';
    otpGroup.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
  const btn = document.querySelector('.otp-btn');
  if (btn) {
    btn.textContent = 'மீண்டும் அனுப்பு';
    btn.style.background = '#1b5e20';
  }
  showToast('OTP அனுப்பப்பட்டது! OTP Sent!', 'success');
}

// ─── MEMBERSHIP FORM ───────────────────────────────────────
function submitMembership(e) {
  e.preventDefault();
  showModal(
    'நன்றி! Welcome!',
    'நீங்கள் இயக்கத்தில் வரவேற்கப்படுகிறீர்கள்! You have joined the Tamil Puligal Katchi movement. உங்கள் மாவட்ட செயலாளர் விரைவில் தொடர்பு கொள்வார்.'
  );
}

// ─── DONATION ──────────────────────────────────────────────
let selectedDonation = 500;
function selectAmount(btn, amount) {
  document.querySelectorAll('.amount-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  selectedDonation = amount;
  const el = document.getElementById('donateAmount');
  if (el) el.textContent = amount.toLocaleString('en-IN');
}
function processDonation() {
  const custom = document.querySelector('.custom-amount');
  const amt = (custom && custom.value) ? parseInt(custom.value) : selectedDonation;
  if (!amt || amt < 1) { showToast('தொகை உள்ளிடவும் / Enter amount', 'error'); return; }
  showModal(
    'நன்றி! Thank You!',
    `₹${amt.toLocaleString('en-IN')} நன்கொடை இயக்கத்தை வலுப்படுத்துகிறது. Your donation strengthens the social justice movement. Payment gateway coming soon.`
  );
}

// ─── NEWSLETTER ────────────────────────────────────────────
function subscribeNewsletter(e) {
  e.preventDefault();
  showToast('பதிவு செய்யப்பட்டது! Subscribed!', 'success');
  e.target.reset();
}

// ─── MODAL HELPERS ─────────────────────────────────────────
function showModal(title, msg) {
  const overlay = document.getElementById('successModal');
  document.getElementById('modalTitle').textContent = title;
  document.getElementById('modalMsg').textContent   = msg;
  overlay.classList.add('show');
}
function closeModal() {
  document.getElementById('successModal').classList.remove('show');
}
document.getElementById('successModal').addEventListener('click', e => {
  if (e.target === e.currentTarget) closeModal();
});

// ─── TOAST ─────────────────────────────────────────────────
function showToast(msg, type = 'success') {
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();

  const t = document.createElement('div');
  t.className = 'toast';
  t.style.cssText = `
    position:fixed; bottom:28px; left:50%; transform:translateX(-50%);
    background:${type === 'success' ? '#2e7d32' : '#c62828'};
    color:#fff; padding:12px 24px; border-radius:40px;
    font-family:'Catamaran',sans-serif; font-weight:700; font-size:14px;
    z-index:9999; box-shadow:0 8px 30px rgba(0,0,0,0.3);
    animation: toastIn 0.35s ease both;
  `;
  t.textContent = msg;
  const style = document.createElement('style');
  style.textContent = `@keyframes toastIn{from{opacity:0;transform:translateX(-50%) translateY(20px);}to{opacity:1;transform:translateX(-50%) translateY(0);}}`;
  document.head.appendChild(style);
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 3200);
}

// ─── TICKER DUPLICATE (infinite seamless) ──────────────────
const tc = document.getElementById('tickerContent');
if (tc) tc.innerHTML += tc.innerHTML;

// ─── SMOOTH SCROLL ─────────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ─── GALLERY LIGHTBOX ──────────────────────────────────────
document.querySelectorAll('.gallery-item').forEach(item => {
  item.addEventListener('click', () => {
    showToast('🖼️ முழு தீர்மானம் வரும்! Full gallery launching soon.', 'success');
  });
});

// ─── VIDEO PLAY ────────────────────────────────────────────
const playBtn = document.getElementById('playBtn');
if (playBtn) {
  playBtn.addEventListener('click', () => {
    showToast('🎬 வீடியோ விரைவில் வரும்! Video launching soon.', 'success');
  });
}

// ─── PARALLAX LITE ─────────────────────────────────────────
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  const heroBg  = document.querySelector('.hero-slideshow');
  if (heroBg) heroBg.style.transform = `translateY(${scrollY * 0.25}px)`;
});

// ─── ACTIVE NAV ON LOAD ────────────────────────────────────
highlightNav();
