import { db } from "./firebase";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  getDoc,
  query,
  where,
  startAfter,
  orderBy,
  limit,
  serverTimestamp
} from "firebase/firestore";

export const createDocument = async (data) => {
  try {
    const docRef = await addDoc(collection(db, "docs"), {
      ...data,
      createdAt: serverTimestamp()
    });
    return docRef.id;
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export async function readDocuments({ pageSize = 10, lastDoc = null, tag = null,email=null }) {
  let constraints = [];

  // Filter by tag if provided
  if (tag) {
    constraints.push(where("tags", "array-contains", tag)); // tags must be an array
  }

  if(email){
    constraints.push(where("email", "==", email));
  }

  // Order by creation date
  constraints.push(orderBy("createdAt", "desc"));

  // Pagination
  if (lastDoc) {
    constraints.push(startAfter(lastDoc));
  }

  // Limit
  constraints.push(limit(pageSize));

  // Build query
  const q = query(collection(db, "docs"), ...constraints);

  const snapshot = await getDocs(q);
  const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

  return {
    docs,
    lastVisible: snapshot.docs[snapshot.docs.length - 1] || null
  };
}

export const updateDocument = async (id, data) => {
  try {
    const docRef = doc(db, "docs", id);
    await updateDoc(docRef, data);
  } catch (e) {
    console.error("Error updating document: ", e);
  }
};

export const deleteDocument = async (id) => {
  try {
    const docRef = doc(db, "docs", id);
    await deleteDoc(docRef);
  } catch (e) {
    console.error("Error deleting document: ", e);
  }
};

export const getDocumentById = async (id) => {
  try {
    const docRef = doc(db, "docs", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      console.log("No such document!");
      return null;
    }
  } catch (e) {
    console.error("Error getting document: ", e);
    return null;
  }
};
