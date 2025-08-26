import { db } from "./firebase";
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc, getDoc } from "firebase/firestore";

export const createDocument = async (data) => {
    try {
        const docRef = await addDoc(collection(db, "docs"), data);
        return docRef.id;
    } catch (e) {
        console.error("Error adding document: ", e);
    }
};

export const readDocuments = async () => {
    try {
        const records = await getDocs(collection(db, "docs"));
        return records.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (e) {
        console.error("Error reading documents: ", e);
    }
};

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

