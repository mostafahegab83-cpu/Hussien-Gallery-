// Data + render helpers for Hussien Gallery static site
window.MERIDIAN_DATA = {
  artworks: [
    { title: "Silent Dialogue", artist: "Nadia El Masry", medium: "Acrylic & gold leaf on canvas", size: "135 × 90 cm", year: "2026", price: "EGP 48,000", image: "assets/artwork-1.jpg" },
    { title: "Field Notes", artist: "Karim Abdel Noor", medium: "Mixed media on linen", size: "100 × 70 cm", year: "2025", price: "EGP 32,000", image: "assets/artwork-2.jpg" },
    { title: "Bird of Passage", artist: "Mina Fahmy", medium: "Bronze sculpture", size: "42 × 24 × 18 cm", year: "2024", price: "EGP 65,000", image: "assets/artwork-3.jpg" },
    { title: "Blue Commute", artist: "Lina Mourad", medium: "Acrylic on canvas", size: "110 × 80 cm", year: "2026", price: "EGP 38,000", image: "assets/artwork-4.jpg" },
  ],
  artists: [
    { name: "Layla Hegazy", discipline: "Painting & installation", note: "Investigates memory, geometry, and domestic space.", image: "assets/artist-1.jpg" },
    { name: "Hatem Mansour", discipline: "Ceramics & sculpture", note: "Builds tactile forms with archetypal references.", image: "assets/artist-2.jpg" },
    { name: "Walid Kanaan", discipline: "Painting", note: "Explores abstraction through layered urban narratives.", image: "assets/artist-3.jpg" },
    { name: "Youssef Gaesa", discipline: "Photography & mixed media", note: "Documents shifting identities through intimate portraits.", image: "assets/artist-4.jpg" },
  ],
  press: [
    { outlet: "Art Review Cairo", title: "Hussien spotlights a new generation of regional voices" },
    { outlet: "The Daily Scene", title: "A precise, warm exhibition program with collector depth" },
    { outlet: "Culture Ledger", title: "Why Hussien Gallery feels built for both discovery and trust" },
    { outlet: "Studio Dispatch", title: "Inside a gallery experience shaped by curation rather than noise" },
  ],
  videos: [
    { title: "Exhibition Walkthrough", duration: "04:26", description: "A guided tour through the current exhibition and curatorial themes.", image: "assets/gallery-interior-1.jpg" },
    { title: "Artist Conversation", duration: "07:12", description: "Studio reflections on process, material choices, and visual language.", image: "assets/hero-artwork.jpg" },
    { title: "Collectors Notes", duration: "03:48", description: "A concise introduction to acquiring and contextualizing featured works.", image: "assets/artwork-1.jpg" },
  ],
  exhibitions: [
    { label: "Current Exhibition", title: "Thresholds of Memory", description: "An immersive group exhibition exploring gesture, symbolism, and material memory through painting, sculpture, and mixed media.", image: "assets/gallery-interior-1.jpg" },
    { label: "Collectors Preview", title: "Private Walkthrough", description: "A guided presentation of selected works for patrons, curators, and institutional partners.", image: "assets/hero-artwork.jpg" },
  ],
};

window.renderArtworks = function (el) {
  if (!el) return;
  el.innerHTML = window.MERIDIAN_DATA.artworks.map((a, i) => `
    <article class="artwork">
      <img src="${a.image}" alt="${a.title} by ${a.artist}" loading="lazy" />
      <div class="artwork-info">
        <h3>${a.artist}</h3>
        <p class="title">${a.title}</p>
        <small>${a.medium}</small>
        <small>${a.size}</small>
        <small>${a.year}</small>
        ${a.price ? `<p class="price">${a.price}</p>` : ""}
        <button class="btn btn-primary btn-sm" data-book="${i}">Book this artwork</button>
      </div>
    </article>
  `).join("");
};

window.renderArtists = function (el) {
  if (!el) return;
  el.innerHTML = window.MERIDIAN_DATA.artists.map((a) => `
    <article class="card artist-card">
      <img src="${a.image}" alt="${a.name} portrait" loading="lazy" />
      <div class="card-body">
        <h3>${a.name}</h3>
        <p class="discipline">${a.discipline}</p>
        <p class="note">${a.note}</p>
        <button class="btn btn-outline">View artist</button>
      </div>
    </article>
  `).join("");
};

window.renderPress = function (el) {
  if (!el) return;
  el.innerHTML = window.MERIDIAN_DATA.press.map((p) => `
    <article class="press-card">
      <div>
        <p class="outlet">${p.outlet}</p>
        <h3>${p.title}</h3>
      </div>
      <div class="meta"><span>Editorial feature</span><span>→</span></div>
    </article>
  `).join("");
};

window.renderVideos = function (el) {
  if (!el) return;
  el.innerHTML = window.MERIDIAN_DATA.videos.map((v) => `
    <article class="card video-card">
      <div class="video-thumb">
        <img src="${v.image}" alt="${v.title}" loading="lazy" />
        <div class="video-meta">
          <div class="play-btn">▶</div>
          <span class="video-duration">${v.duration}</span>
        </div>
      </div>
      <div class="card-body">
        <h3>${v.title}</h3>
        <p style="color:var(--muted-foreground);margin-top:.5rem;">${v.description}</p>
      </div>
    </article>
  `).join("");
};

window.renderExhibitions = function (el) {
  if (!el) return;
  el.innerHTML = window.MERIDIAN_DATA.exhibitions.map((e) => `
    <article class="card exhibition-card">
      <img src="${e.image}" alt="${e.title}" loading="lazy" />
      <div class="card-body">
        <p class="label">${e.label}</p>
        <h3>${e.title}</h3>
        <p>${e.description}</p>
      </div>
    </article>
  `).join("");
};
