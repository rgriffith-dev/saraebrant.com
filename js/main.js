// === MOBILE NAV TOGGLE ===
const navToggle = document.getElementById('nav-toggle');
const navLinks = document.getElementById('nav-links');

navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('active');
  navLinks.classList.toggle('open');
});

// Close mobile nav when a link is clicked
navLinks.addEventListener('click', (e) => {
  if (e.target.tagName === 'A') {
    navToggle.classList.remove('active');
    navLinks.classList.remove('open');
  }
});

// === ANIMATED COUNTERS ===
function animateCounters() {
  const counters = document.querySelectorAll('.metric-number');
  counters.forEach(counter => {
    if (counter.dataset.animated) return;
    const target = parseInt(counter.dataset.target);
    const duration = 2000;
    const start = performance.now();

    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      counter.textContent = Math.floor(eased * target);
      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        counter.textContent = target;
      }
    }

    counter.dataset.animated = 'true';
    requestAnimationFrame(update);
  });
}

const metricsGrid = document.querySelector('.metrics-grid');
if (metricsGrid) {
  const metricsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounters();
        metricsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  metricsObserver.observe(metricsGrid);
}
