// Firebase initialization
import { initializeApp, getApps } from 'firebase/app';
import { getAnalytics, isSupported as isAnalyticsSupported } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';

// NOTE: Keys are public client-side config; do not store secrets here
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY || "AIzaSyBSrFNuIbTk2khv-qO-lxhQ3IuRcVrwO2k",
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || "student-prediction-eec30.firebaseapp.com",
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || "student-prediction-eec30",
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || "student-prediction-eec30.firebasestorage.app",
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || "1067622216494",
  appId: process.env.REACT_APP_FIREBASE_APP_ID || "1:1067622216494:web:243bf65c993b851f1dc0bf",
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID || "G-CQVSF1VZ42"
};

// Check if Firebase app is already initialized
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// Export Analytics only if supported (SSR/build friendly)
let analytics = null;
(async () => {
  try {
    if (typeof window !== 'undefined' && await isAnalyticsSupported()) {
      analytics = getAnalytics(app);
    }
  } catch (e) {
    // No-op: analytics not critical
  }
})();

export const auth = getAuth(app);
export { app, analytics };