import firebase from "firebase";
import "firebase/auth";
import "firebase/messaging";

const config = {
  apiKey: process.env.FB_API_KEY,
  authDomain: process.env.FB_AUTH_DOMAIN,
  databaseURL: process.env.FB_DATABASE_URL,
  projectId: process.env.FB_PROJECTID,
  storageBucket: process.env.FB_STORAGE_BUCKET,
  messagingSenderId: process.env.FB_MESSAGING_SENDER_ID,
  appId: process.env.FB_APP_ID,
  timestampsInSnapshots: true
};
if (!firebase.apps.length) {
  console.log(config);
  firebase.initializeApp(config);
}

export const authProviders = {
  Email: firebase.auth.EmailAuthProvider.PROVIDER_ID
};

export const auth = firebase.auth();

const firebaseFunctions = firebase.app().functions(process.env.FB_REGION);
if (process.env.EMULATOR_ORIGIN) {
  firebaseFunctions.emulatorOrigin = process.env.EMULATOR_ORIGIN;
}

export const functions = firebaseFunctions;

const firebaseMessaging = firebase.messaging();
firebaseMessaging.usePublicVapidKey(process.env.FB_PUBLIC_VAPID_KEY);

export const messaging = firebaseMessaging;
