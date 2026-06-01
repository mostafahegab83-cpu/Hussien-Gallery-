# Hussien Gallery — Static Site with Firebase Bookings

A static HTML/CSS/JS gallery website with a "Book this artwork" form that saves bookings to Firebase Firestore (Cash on Delivery).

## Files

- `index.html`, `about.html`, `artists.html`, `exhibitions.html`, `artworks.html`, `videos.html` — pages
- `styles.css` — all styling (including the booking modal)
- `partials.js` — shared header/footer renderer
- `data.js` — gallery content (artworks, artists, videos, exhibitions) + render helpers
- `script.js` — nav toggle / active link
- `firebase-config.js` — **EDIT THIS** with your Firebase project credentials
- `booking.js` — booking modal logic + Firestore submission
- `assets/` — images

## Setup (5 minutes)

### 1. Create a Firebase project
1. Go to https://console.firebase.google.com/ → **Add project**
2. In the project, click the **Web** icon (`</>`) to register a Web App
3. Copy the `firebaseConfig` object Firebase shows you

### 2. Enable Firestore
1. In the Firebase Console sidebar, open **Build → Firestore Database**
2. Click **Create database**
3. Pick a region, then choose **Start in test mode** while developing
   (this allows public writes for 30 days — see "Security" below before going live)

### 3. Paste your config
Open `firebase-config.js` and replace the placeholders:
```js
window.FIREBASE_CONFIG = {
  apiKey: "AIza…",
  authDomain: "my-project.firebaseapp.com",
  projectId: "my-project",
  storageBucket: "my-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123…:web:abc…",
};
```

### 4. Deploy
Upload the whole folder to any static host — GitHub Pages, Netlify, Vercel, Cloudflare Pages, or Firebase Hosting. No build step needed.

## Where bookings go

Every confirmed booking is written to the `bookings` collection in Firestore with these fields:

| Field | Example |
| --- | --- |
| `customer_name` | "Ahmed Hussien" |
| `email` | "ahmed@example.com" |
| `mobile` | "+20 100 000 0000" |
| `address` | "12 Nile St, Cairo" |
| `notes` | "Please call before delivery" |
| `artwork_title` | "Silent Dialogue" |
| `artwork_artist` | "Nadia El Masry" |
| `artwork_price` | "EGP 48,000" |
| `payment_method` | `"cash_on_delivery"` |
| `status` | `"pending"` |
| `created_at` | Firestore server timestamp |

View them in Firebase Console → Firestore Database → `bookings` collection.

## Security (before going public)

Test-mode rules expire and allow any writes. Replace your Firestore rules with something like:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /bookings/{id} {
      // Anyone can create a booking
      allow create: if
        request.resource.data.customer_name is string &&
        request.resource.data.customer_name.size() <= 200 &&
        request.resource.data.email is string &&
        request.resource.data.email.size() <= 320 &&
        request.resource.data.mobile is string &&
        request.resource.data.address is string &&
        request.resource.data.payment_method == "cash_on_delivery";
      // Only you (signed in) can read/update/delete
      allow read, update, delete: if request.auth != null;
    }
  }
}
```

## Editing content

All artworks, artists, exhibitions, and videos live in `data.js`. Add a `price` field to any artwork to display it on the card and include it in bookings.
