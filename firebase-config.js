// ============================================================
//  FIREBASE CONFIG — REPLACE THESE VALUES WITH YOUR OWN
// ============================================================
// 1. Go to https://console.firebase.google.com/ and create a project
// 2. Add a Web App and copy the firebaseConfig object below
// 3. In Build > Firestore Database, click "Create database" (start in test mode while developing)
// 4. Replace the placeholders below, then host this folder anywhere (GitHub Pages, Netlify, etc.)
// ------------------------------------------------------------
window.FIREBASE_CONFIG = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID",
};

// Firestore collection where bookings will be stored
window.FIREBASE_BOOKINGS_COLLECTION = "bookings";
