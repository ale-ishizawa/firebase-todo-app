import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyDGN0KDLGoPSS6jT5EIrHOGCq1Jk5VHg1s",
  authDomain: "clinicorp-398522.firebaseapp.com",
  projectId: "clinicorp-398522",
  storageBucket: "clinicorp-398522.appspot.com",
  messagingSenderId: "444719161701",
  appId: "1:444719161701:web:b91f1a6258be6dd6d1018c",
  measurementId: "G-VPN9C1PE48"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
