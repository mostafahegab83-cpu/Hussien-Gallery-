// Hussien Gallery — booking dialog + Firebase Firestore submission
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

let db = null;
try {
  const cfg = window.FIREBASE_CONFIG;
  if (cfg && cfg.apiKey && !cfg.apiKey.startsWith("YOUR_")) {
    const app = initializeApp(cfg);
    db = getFirestore(app);
  } else {
    console.warn(
      "[Hussien Gallery] Firebase config missing. Update firebase-config.js to enable bookings."
    );
  }
} catch (err) {
  console.error("[Hussien Gallery] Firebase init failed:", err);
}

function buildDialog() {
  const wrap = document.createElement("div");
  wrap.className = "booking-overlay";
  wrap.setAttribute("hidden", "");
  wrap.innerHTML = `
    <div class="booking-modal" role="dialog" aria-modal="true" aria-labelledby="booking-title">
      <button class="booking-close" type="button" aria-label="Close">×</button>
      <p class="eyebrow">Reserve artwork</p>
      <h2 id="booking-title">Book this piece</h2>
      <p class="booking-artwork-line"></p>
      <form class="booking-form">
        <label>Full name<input name="customer_name" required maxlength="200" autocomplete="name" /></label>
        <label>Email<input name="email" type="email" required maxlength="320" autocomplete="email" /></label>
        <label>Mobile<input name="mobile" required maxlength="50" autocomplete="tel" /></label>
        <label>Delivery address<textarea name="address" required maxlength="1000" rows="3" autocomplete="street-address"></textarea></label>
        <label>Notes (optional)<textarea name="notes" maxlength="1000" rows="2"></textarea></label>
        <div class="booking-payment">
          <strong>Payment method</strong>
          <span>Cash on delivery</span>
        </div>
        <button type="submit" class="btn btn-primary booking-submit">Confirm booking</button>
        <p class="booking-status" role="status"></p>
      </form>
    </div>
  `;
  document.body.appendChild(wrap);
  return wrap;
}

let overlay;
function ensureDialog() {
  if (!overlay) overlay = buildDialog();
  return overlay;
}

function openBooking(artwork) {
  const ov = ensureDialog();
  const form = ov.querySelector(".booking-form");
  form.reset();
  ov.querySelector(".booking-status").textContent = "";
  ov.querySelector(".booking-artwork-line").innerHTML = artwork
    ? `<strong>${artwork.title}</strong> by ${artwork.artist}${
        artwork.price ? ` — <span class="price">${artwork.price}</span>` : ""
      }`
    : "";
  ov.removeAttribute("hidden");
  document.body.style.overflow = "hidden";

  ov.querySelector(".booking-close").onclick = closeBooking;
  ov.onclick = (e) => {
    if (e.target === ov) closeBooking();
  };

  form.onsubmit = async (e) => {
    e.preventDefault();
    const status = ov.querySelector(".booking-status");
    const submit = ov.querySelector(".booking-submit");
    const data = Object.fromEntries(new FormData(form).entries());
    const payload = {
      ...data,
      artwork_title: artwork ? artwork.title : null,
      artwork_artist: artwork ? artwork.artist : null,
      artwork_price: artwork ? artwork.price || null : null,
      payment_method: "cash_on_delivery",
      status: "pending",
      created_at: serverTimestamp ? serverTimestamp() : new Date().toISOString(),
    };

    if (!db) {
      status.textContent =
        "Booking system not configured yet. Please add your Firebase config in firebase-config.js.";
      status.className = "booking-status error";
      return;
    }

    submit.disabled = true;
    status.textContent = "Sending…";
    status.className = "booking-status";
    try {
      await addDoc(collection(db, window.FIREBASE_BOOKINGS_COLLECTION || "bookings"), payload);
      status.textContent = "Booking received. We'll contact you shortly to confirm.";
      status.className = "booking-status success";
      form.reset();
      setTimeout(closeBooking, 2200);
    } catch (err) {
      console.error(err);
      status.textContent = "Could not submit booking: " + (err.message || err);
      status.className = "booking-status error";
    } finally {
      submit.disabled = false;
    }
  };
}

function closeBooking() {
  if (!overlay) return;
  overlay.setAttribute("hidden", "");
  document.body.style.overflow = "";
}

// Wire up "Book" buttons rendered by data.js
document.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-book]");
  if (!btn) return;
  const idx = parseInt(btn.getAttribute("data-book"), 10);
  const art = (window.MERIDIAN_DATA && window.MERIDIAN_DATA.artworks) || [];
  openBooking(art[idx]);
});

window.openBookingDialog = openBooking;
