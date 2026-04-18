import { db } from "@/lib/firebase/config";
import { 
  collection, 
  getDocs, 
  query, 
  where, 
  doc, 
  getDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc,
  serverTimestamp,
  orderBy
} from "firebase/firestore";

// Generic fetcher
export async function getCollection(colName: string, orderField: string = "createdAt") {
  const colRef = collection(db, colName);
  const q = query(colRef, orderBy(orderField, "desc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export async function getDocument(colName: string, id: string) {
  const docRef = doc(db, colName, id);
  const snapshot = await getDoc(docRef);
  return snapshot.exists() ? { id: snapshot.id, ...snapshot.data() } : null;
}

export async function getDocumentBySlug(colName: string, slug: string) {
  const colRef = collection(db, colName);
  const q = query(colRef, where("slug", "==", slug));
  const snapshot = await getDocs(q);
  return snapshot.docs.length > 0 ? { id: snapshot.docs[0].id, ...snapshot.docs[0].data() } : null;
}

// Add/Update/Delete Helpers
export async function addDocument(colName: string, data: any) {
  const colRef = collection(db, colName);
  return await addDoc(colRef, {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
}

export async function updateDocument(colName: string, id: string, data: any) {
  const docRef = doc(db, colName, id);
  return await updateDoc(docRef, {
    ...data,
    updatedAt: serverTimestamp(),
  });
}

export async function deleteDocument(colName: string, id: string) {
  const docRef = doc(db, colName, id);
  return await deleteDoc(docRef);
}
