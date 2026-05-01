import {initializeApp} from '@angular/fire/app';
import {getFirestore} from '@angular/fire/firestore';

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyCPvwuA7wMDE7-tq-Bn5TmcpdJ3GnOJ9Ac",
    authDomain: "canarymed-9d526.firebaseapp.com",
    projectId: "canarymed-9d526",
    storageBucket: "canarymed-9d526.firebasestorage.app",
    messagingSenderId: "816032465149",
    appId: "1:816032465149:web:86c6d1eb068c4bc8bc3e94"
  }
};
const app = initializeApp(environment.firebase);
export const db = getFirestore(app);
