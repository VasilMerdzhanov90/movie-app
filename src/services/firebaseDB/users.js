import {
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "../../firebase/config.js";
import { removeUser, setUser } from "../../utils/userData.js";
import { useCollection } from "./data.js";

const { createNewUserDocument } = useCollection("users");

export function userActions() {
  const login = async ({ email, password }) => {
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      setUser({ user });
      return user;
    } catch (err) {
      return err.message;
    }
  };

  const signIn = async ({ email, password, displayName }) => {
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);
      updateProfile(auth.currentUser, {
        displayName,
      });
      createNewUserDocument(user.user.uid, email, displayName);
      setUser({ user });
      return user;
    } catch (err) {
      return err;
    }
  };

  const logout = async () => {
    try {
      const res = await auth.signOut();
      removeUser();
      return res;
    } catch (err) {
      throw new Error(err.message);
    }
  };

  return { login, signIn, logout };
}
