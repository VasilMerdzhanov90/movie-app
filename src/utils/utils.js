import { doc, setDoc, db, Timestamp } from '../firebase/config.js';

//util function to create document for user data
export const createNewUserDocument = async (id, email, displayName) => {
    try {
        await setDoc(doc(db, "users", id), {
            id,
            displayName,
            email,
            createdAt: Timestamp.fromDate(new Date)
        });
    } catch (error) {
        console.log(error.message)
    }
}
