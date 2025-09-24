# Deployment Instructions

## Firebase Setup for Vercel Deployments

### Current Deployment Domain
Your current deployment is at: `dropout-front-29gn-offhna73k-shlok2345788s-projects.vercel.app`

### Firebase Authorized Domains Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select project: `student-prediction-eec30`
3. Navigate to: **Authentication** → **Settings** → **Authorized domains**
4. Add these domains:

```
localhost
dropout-front-*.vercel.app
dropout-front-29gn-offhna73k-shlok2345788s-projects.vercel.app
```

### Why the 401 Manifest Error?

The manifest.json 401 error occurs because:
1. Firebase authentication fails due to unauthorized domain
2. This affects the entire app's authentication state
3. The manifest.json request inherits the failed auth state

### After Adding Domains:

1. Save the authorized domains in Firebase
2. Wait 2-3 minutes for propagation
3. Hard refresh your Vercel deployment (Ctrl+F5)
4. Test Google authentication

### Environment Variables for Vercel

In your Vercel dashboard, add these environment variables:
- `REACT_APP_FIREBASE_API_KEY`: AIzaSyBSrFNuIbTk2khv-qO-lxhQ3IuRcVrwO2k
- `REACT_APP_FIREBASE_AUTH_DOMAIN`: student-prediction-eec30.firebaseapp.com
- `REACT_APP_FIREBASE_PROJECT_ID`: student-prediction-eec30
- `REACT_APP_FIREBASE_STORAGE_BUCKET`: student-prediction-eec30.firebasestorage.app
- `REACT_APP_FIREBASE_MESSAGING_SENDER_ID`: 1067622216494
- `REACT_APP_FIREBASE_APP_ID`: 1:1067622216494:web:243bf65c993b851f1dc0bf
- `REACT_APP_FIREBASE_MEASUREMENT_ID`: G-CQVSF1VZ42