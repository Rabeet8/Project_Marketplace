import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfigCopy = {
  apiKey: "AIzaSyBiPMjgGiKV5P_6CMiNQbyHUr-hGHqL8gY",
  authDomain: "giftmethis-4cac6.firebaseapp.com",
  projectId: "giftmethis-4cac6",
  storageBucket: "giftmethis-4cac6.firebasestorage.app",
  messagingSenderId: "995417171351",
  appId: "1:995417171351:web:023b59043612b5591250d2"
};

const storageApp = initializeApp(firebaseConfigCopy, 'storage');
export const FIREBASE_STORAGE = getStorage(storageApp);