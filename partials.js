// Shared header & footer injected on every page via small inline script.
// Each page calls renderShell(activePath) after loading this file.
window.MERIDIAN = {
  site: {
    name: "Hussien Gallery",
    shortName: "Hussien Gallery",
    description:
      "A contemporary art destination presenting exhibitions, artists, artworks, and cultural programs through a refined editorial digital experience.",
    email: "hello@hussienartgallery.com",
    phone: "+20 12 3456 7890",
    address: "28 Riverfront Passage, Zamalek, Cairo, Egypt",
    hours: "Daily from 11 am to 8 pm, except Fridays",
  },
  navigation: [
    { label: "Home", href: "index.html" },
    { label: "About Us", href: "about.html" },
    { label: "Artists", href: "artists.html" },
    { label: "Exhibitions", href: "exhibitions.html" },
    { label: "Artworks", href: "artworks.html" },
    { label: "Videos", href: "videos.html" },
  ],
};

window.renderShell = function () {
  const { site, navigation } = window.MERIDIAN;
  const headerHTML = `
    <header class="site-header">
      <div class="header-inner">
        <a href="index.html" class="brand">
          <div class="brand-mark">MA</div>
          <div class="brand-text">
            <p class="eyebrow">Contemporary art platform</p>
            <strong>${site.shortName}</strong>
          </div>
        </a>
        <nav class="main-nav">
          ${navigation.map((n) => `<a href="${n.href}">${n.label}</a>`).join("")}
        </nav>
        <button class="nav-toggle" data-nav-toggle aria-label="Toggle menu">Menu</button>
        <a class="btn btn-outline btn-sm" href="mailto:${site.email}">Contact</a>
      </div>
      <div class="mobile-nav" data-mobile-nav>
        ${navigation.map((n) => `<a href="${n.href}">${n.label}</a>`).join("")}
      </div>
    </header>
  `;

  const footerHTML = `
    <footer class="site-footer">
      <div class="container footer-grid">
        <div class="footer-brand">
          <p class="eyebrow">${site.shortName}</p>
          <h2>A quieter, more collectible digital gallery.</h2>
          <p>${site.description}</p>
        </div>
        <div class="footer-info">
          <div class="title">📍 <strong>Address</strong></div>
          <p>${site.address}</p>
        </div>
        <div class="footer-info">
          <div class="title">🕒 <strong>Working hours</strong></div>
          <p>${site.hours}</p>
        </div>
        <div class="footer-info">
          <div class="title">✉ <strong>Contact us</strong></div>
          <p>${site.phone}</p>
          <p><a href="mailto:${site.email}">${site.email}</a></p>
        </div>
      </div>
    </footer>
  `;

  const headerSlot = document.querySelector('[data-header]');
  const footerSlot = document.querySelector('[data-footer]');
  if (headerSlot) headerSlot.innerHTML = headerHTML;
  if (footerSlot) footerSlot.innerHTML = footerHTML;
};
