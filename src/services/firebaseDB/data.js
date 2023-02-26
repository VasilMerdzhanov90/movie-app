import {
  collection,
  db,
  doc,
  getDocs,
  Timestamp,
  getDoc,
  updateDoc,
  setDoc
} from "../../firebase/config.js";

export function useCollection(collectionRef) {
  const createNewUserDocument = async (id, email, displayName) => {
    try {
      await setDoc(doc(db, "users", id), {
        id,
        displayName,
        email,
        favorites: {},
        createdAt: Timestamp.fromDate(new Date()),
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const deleteDocument = () => {};

  const updateDocument = async (id, favorites) => {
    try {
      const docRef = doc(db, collectionRef, id);
      await updateDoc(docRef, {
        favorites,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const readDocument = async (id) => {
    try {
      const docRef = doc(db, collectionRef, id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return {
          userData: docSnap.data(),
          favorites: docSnap.data().favorites,
        };
      } else {
        return "Document does not exist";
      }
    } catch (error) {}
  };

  const readCollection = async () => {
    try {
      let result = [];
      const data = await getDocs(collection(db, collectionRef));
      data.docs.forEach((element) => {
        result.push({ ...element.data(), id: element.id });
      });
      return result;
    } catch (err) {
      throw new Error(err.message);
    }
  };

  return {
    createNewUserDocument,
    deleteDocument,
    updateDocument,
    readDocument,
    readCollection,
  };
}
