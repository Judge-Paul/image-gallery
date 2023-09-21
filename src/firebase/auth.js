import firebaseApp from "./config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  getAuth,
} from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";

const auth = getAuth(firebaseApp);
const db = getDatabase(firebaseApp);

export async function signUp(username, email, password) {
  let result = null,
    error = null;
  try {
    result = await createUserWithEmailAndPassword(auth, email, password);

    if (result.user) {
      const userId = result.user.uid;
      const userRef = ref(db, `users/${userId}`);
      await set(userRef, {
        username: username,
        email: email,
      });
    }
  } catch (e) {
    error = e;
  }

  return { result, error };
}

export async function signIn(email, password) {
  let result = null,
    error = null;
  try {
    result = await signInWithEmailAndPassword(auth, email, password);
  } catch (e) {
    error = e;
  }

  return { result, error };
}
