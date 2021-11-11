import { initializeApp } from 'firebase/app';
import { getFirestore } from '@firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.React_App_Api_Key,
  authDomain: process.env.React_App_Auth_Domain,
  projectId: process.env.React_App_Project_Id,
  storageBucket: process.env.React_App_Storage_Bucket,
  messagingSenderId: process.env.React_App_Messaging_Sender_Id,
  appId: process.env.React_App_App_Id,
};

const firebaseApp = initializeApp(firebaseConfig);
export const firebaseDb = getFirestore(firebaseApp);