import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, signInWithPopup, onAuthStateChanged, updateProfile, sendEmailVerification } from "firebase/auth";
import { auth, googleProvider } from "./firebase";
import { useUserStore } from "@/context/useUserStore";

export const signup = async (email, password, name) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(userCredential.user, { displayName: name });
        await sendEmailVerification(userCredential.user);

        return userCredential.user;
    } catch (error) {
        console.error("Error signing up:", error);
        throw error;
    }
}

export const login = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        
        if (!userCredential.user.emailVerified) {
          throw new Error("Please verify your email before logging in.");
        }
        else        
        return userCredential.user;
    } catch (error) {
        console.error("Error logging in:", error);
        throw error;
    }
}

export const logout = async () => {
    try {
        await signOut(auth);
    } catch (error) {
        console.error("Error logging out:", error);
        throw error;
    }
}

export const signInWithGoogle = async () => {
    const setUser = useUserStore.getState().setUser;
    try {
        const result = await signInWithPopup(auth, googleProvider);
        return result.user;
    } catch (error) {
        console.error("Error signing in with Google:", error);
        throw error;
    }
}

export const listenToAuthChanges = () => {
  const { setUser, clearUser } = useUserStore.getState();
  const unsub = onAuthStateChanged(auth, (user) => {
    user && user.emailVerified ? setUser(user) : clearUser();
  });
  return unsub;
};