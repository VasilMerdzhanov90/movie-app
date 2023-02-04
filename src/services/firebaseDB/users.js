import { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from '../../firebase/config.js';
import { createNewUserDocument } from '../../utils/utils.js';


export function userActions() {
    let isPending = false;
    let error = '';

    const login = async ({ email, password }) => {
        isPending = true;
        try {
            const user = await signInWithEmailAndPassword(auth, email, password);
            isPending = false;
            return user;
        } catch (err) {
            isPending = false;
            error = err.message;
            throw new Error(error.message);
        }
    };

    const signIn = async ({ email, password, displayName }) => {
        isPending = true;
        try {
            const user = await createUserWithEmailAndPassword(auth, email, password);
            updateProfile(auth.currentUser, {
                displayName
            });
            createNewUserDocument(user.user.uid, email, displayName);
            isPending = false;
            return user;
        } catch (err) {
            isPending = false;
            error = err.message;
            throw new Error(error.message);
        }
    };

    const logout = async () => {
        isPending = true;
        try {
            await auth.signOut();
            isPending = false;
        } catch (err) {
            error = err.message;
            isPending = false;
            throw new Error(error.message);
        }
    }

    return { login, signIn, logout, isPending, error }
}