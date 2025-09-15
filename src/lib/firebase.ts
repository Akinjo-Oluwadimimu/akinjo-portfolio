import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, addDoc, getDocs, serverTimestamp, orderBy, query } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Contacts collection utility functions
export type Contact = {
    id?: string;
    name: string;
    email: string;
    message: string;
    createdAt: any;
}

const contactsCollection = collection(db, 'contacts');

export const addContact = async (contact: Omit<Contact, 'id' | 'createdAt'>) => {
    return await addDoc(contactsCollection, {
        ...contact,
        createdAt: serverTimestamp(),
    });
}

export const getContacts = async (): Promise<Contact[]> => {
    const q = query(contactsCollection, orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt.toDate()
    } as Contact));
}

export { app, auth, db };
