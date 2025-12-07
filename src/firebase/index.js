import { initializeApp } from "firebase/app";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  arrayUnion,
  collection,
  getDocs,
  deleteDoc,
} from "firebase/firestore/lite";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASURMENT_ID,
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);
// Analytics initialization removed - initialize on client side when needed
async function getDocuments(collectionName, retries = 3) {
  const timeout = 10000; // 10 seconds timeout
  
  for (let i = 0; i < retries; i++) {
    try {
      const ref = collection(db, collectionName);
      
      // Add timeout wrapper
      const fetchPromise = getDocs(ref);
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Firestore request timeout')), timeout)
      );
      
      const response = await Promise.race([fetchPromise, timeoutPromise]);
      const res = response.docs.map((doc) => doc.data());
      return res;
    } catch (error) {
      const errorMessage = error?.message || error?.toString() || 'Unknown error';
      console.error(`Firestore getDocuments error (attempt ${i + 1}/${retries}) for ${collectionName}:`, errorMessage);
      
      if (i === retries - 1) {
        // Last attempt failed, return empty array instead of throwing to prevent page crash
        console.error(`Failed to fetch documents from ${collectionName} after ${retries} attempts`);
        return [];
      }
      // Wait before retrying (exponential backoff)
      await new Promise(resolve => setTimeout(resolve, Math.pow(2, i) * 1000));
    }
  }
  return [];
}
async function getDocumentsWithIds(collectionName, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      const ref = collection(db, collectionName);
      const response = await getDocs(ref);
      const res = response.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      return res;
    } catch (error) {
      console.error(`Firestore getDocumentsWithIds error (attempt ${i + 1}/${retries}):`, error);
      if (i === retries - 1) {
        // Last attempt failed, throw error
        throw new Error(`Failed to fetch documents with IDs from ${collectionName} after ${retries} attempts: ${error.message || 'Unknown error'}`);
      }
      // Wait before retrying (exponential backoff)
      await new Promise(resolve => setTimeout(resolve, Math.pow(2, i) * 1000));
    }
  }
  return [];
}
async function addDocument(collectionName, uniqueId, data) {
  await setDoc(doc(db, collectionName, uniqueId), data);
}
async function getDocument(collectionName, id) {
  const docRef = doc(db, collectionName, id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data();
  }
}
async function removeDocument(collectionName, uniqueId) {
  await deleteDoc(doc(db, collectionName, uniqueId));
}
async function updateDocument(keys, values, collectionName, id) {
  const docRef = doc(db, collectionName, id);
  const docSnapshot = await getDoc(docRef);

  const existingData = docSnapshot.data();
  const updatedData = { ...existingData };
  keys.forEach((key, index) => {
    updatedData[key] = values[index];
  });
  await updateDoc(docRef, updatedData);
}
export {
  storage,
  auth,
  addDocument,
  getDocuments,
  getDocumentsWithIds,
  getDocument,
  removeDocument,
  updateDocument,
};
