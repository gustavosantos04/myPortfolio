const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = window.matchMedia('(pointer: fine)').matches;

// Header, scroll progress and subtle hero parallax
const header = document.querySelector('[data-header]');
const progress = document.querySelector('.scroll-progress');
const parallaxItems = document.querySelectorAll('[data-parallax]');

function updateScrollEffects() {
  const scrollTop = window.scrollY;
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  header.classList.toggle('scrolled', scrollTop > 24);
  progress.style.width = `${maxScroll ? (scrollTop / maxScroll) * 100 : 0}%`;

  if (!reducedMotion && scrollTop < window.innerHeight) {
    parallaxItems.forEach((item) => {
      const speed = Number(item.dataset.parallax);
      item.style.transform = `translate3d(${scrollTop * speed}px, ${scrollTop * Math.abs(speed) * .35}px, 0)`;
    });
  }
}

window.addEventListener('scroll', updateScrollEffects, { passive: true });
updateScrollEffects();

// Mobile navigation
const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.main-nav');

function closeMenu() {
  menuButton.classList.remove('active');
  navigation.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Abrir menu');
  document.body.classList.remove('menu-open');
}

menuButton.addEventListener('click', () => {
  const open = !navigation.classList.contains('open');
  menuButton.classList.toggle('active', open);
  navigation.classList.toggle('open', open);
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
  document.body.classList.toggle('menu-open', open);
});

navigation.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeMenu(); });

// Scroll reveal with a small cascade
const revealItems = document.querySelectorAll('.reveal');
if (reducedMotion || !('IntersectionObserver' in window)) {
  revealItems.forEach((item) => item.classList.add('visible'));
} else {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const siblings = [...entry.target.parentElement.children].filter((child) => child.classList.contains('reveal'));
      const index = Math.max(0, siblings.indexOf(entry.target));
      entry.target.style.transitionDelay = `${Math.min(index * 70, 280)}ms`;
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px' });
  revealItems.forEach((item) => revealObserver.observe(item));
}

// Custom cursor and magnetic interactions
if (finePointer) {
  const dot = document.querySelector('.cursor-dot');
  const ring = document.querySelector('.cursor-ring');
  let mouseX = -100, mouseY = -100, ringX = -100, ringY = -100;

  window.addEventListener('pointermove', (event) => {
    mouseX = event.clientX; mouseY = event.clientY;
    dot.style.opacity = '1'; ring.style.opacity = '1';
    dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
  });

  function renderCursor() {
    ringX += (mouseX - ringX) * .14; ringY += (mouseY - ringY) * .14;
    ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
    requestAnimationFrame(renderCursor);
  }
  renderCursor();

  document.querySelectorAll('a, button, .tilt-card').forEach((item) => {
    item.addEventListener('mouseenter', () => ring.classList.add('active'));
    item.addEventListener('mouseleave', () => ring.classList.remove('active'));
  });

  if (!reducedMotion) {
    document.querySelectorAll('.magnetic').forEach((item) => {
      item.addEventListener('pointermove', (event) => {
        const rect = item.getBoundingClientRect();
        item.style.transform = `translate(${(event.clientX - rect.left - rect.width / 2) * .18}px, ${(event.clientY - rect.top - rect.height / 2) * .18}px)`;
      });
      item.addEventListener('pointerleave', () => { item.style.transform = ''; });
    });

    document.querySelectorAll('.tilt-card').forEach((card) => {
      card.addEventListener('pointermove', (event) => {
        const rect = card.getBoundingClientRect();
        const rotateY = ((event.clientX - rect.left) / rect.width - .5) * 8;
        const rotateX = (.5 - (event.clientY - rect.top) / rect.height) * 8;
        card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      });
      card.addEventListener('pointerleave', () => { card.style.transform = ''; });
    });
  }
}

// Lightweight particle field: a quiet tech texture, responsive to the pointer
if (!reducedMotion) {
  const canvas = document.querySelector('#particle-canvas');
  const context = canvas.getContext('2d');
  let width = 0, height = 0, particles = [];
  const pointer = { x: -1000, y: -1000 };

  function resizeCanvas() {
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    width = canvas.clientWidth; height = canvas.clientHeight;
    canvas.width = width * ratio; canvas.height = height * ratio;
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    const amount = Math.min(65, Math.floor(width / 22));
    particles = Array.from({ length: amount }, () => ({
      x: Math.random() * width, y: Math.random() * height,
      vx: (Math.random() - .5) * .17, vy: (Math.random() - .5) * .17,
      radius: Math.random() * 1.2 + .3
    }));
  }

  canvas.addEventListener('pointermove', (event) => { pointer.x = event.clientX; pointer.y = event.clientY; });
  canvas.addEventListener('pointerleave', () => { pointer.x = -1000; pointer.y = -1000; });
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  function drawParticles() {
    context.clearRect(0, 0, width, height);
    particles.forEach((particle, index) => {
      particle.x += particle.vx; particle.y += particle.vy;
      if (particle.x < 0 || particle.x > width) particle.vx *= -1;
      if (particle.y < 0 || particle.y > height) particle.vy *= -1;
      const dx = pointer.x - particle.x, dy = pointer.y - particle.y;
      if (Math.hypot(dx, dy) < 140) { particle.x -= dx * .002; particle.y -= dy * .002; }
      context.beginPath(); context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      context.fillStyle = index % 9 === 0 ? 'rgba(255,43,34,.7)' : 'rgba(255,255,255,.3)'; context.fill();
    });
    requestAnimationFrame(drawParticles);
  }
  drawParticles();
}

document.querySelector('#current-year').textContent = new Date().getFullYear();
