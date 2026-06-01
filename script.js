// Hussien Gallery — shared client script
(function () {
  // Mobile nav toggle
  const toggle = document.querySelector('[data-nav-toggle]');
  const mobileNav = document.querySelector('[data-mobile-nav]');
  if (toggle && mobileNav) {
    toggle.addEventListener('click', () => {
      mobileNav.classList.toggle('open');
    });
  }

  // Highlight active nav link
  const path = window.location.pathname.replace(/\/$/, '') || '/';
  document.querySelectorAll('.main-nav a, .mobile-nav a').forEach((a) => {
    const href = a.getAttribute('href').replace(/\/$/, '') || '/';
    if (href === path || (href !== '/' && path.endsWith(href))) {
      a.classList.add('active');
    }
  });

  // Smooth-reveal images on load
  document.querySelectorAll('img').forEach((img) => {
    if (img.complete) img.style.opacity = '1';
    else {
      img.style.opacity = '0';
      img.style.transition = 'opacity 0.6s ease';
      img.addEventListener('load', () => (img.style.opacity = '1'));
    }
  });
})();
