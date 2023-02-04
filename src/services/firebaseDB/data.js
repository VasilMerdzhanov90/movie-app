import { collection, db, getDocs } from "../../firebase/config.js";


export function useCollection(collectionRef) {

    let error = '';
    let isPending = false;

    const createDocument = () => {

    };

    const deleteDocument = () => {

    };

    const updateDocument = () => {

    };

    const readDocument = () => {

    };

    const readCollection = async () => {
        isPending = true;
        try {
            let result = [];
            const data = await getDocs(collection(db, collectionRef));
            data.docs.forEach(element => {
                result.push({ ...element.data(), id: element.id })
            });
            isPending = false;
            return result;
        } catch (err) {
            isPending = false;
            error = err.message;
            throw new Error(err.message);
        }

    }


    return { createDocument, deleteDocument, updateDocument, readDocument, readCollection, isPending, error }
}