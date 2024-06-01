import PropTypes from "prop-types";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import "../firebase";
export const AuthContext = createContext();
export default function AuthProvider({ children }) {
  const [authUser, setAuthUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [firebaseError, setFirebaseError] = useState("");
  const [firebaseLoginError, setFirebaseLoginError] = useState("");
  // signup
  const signup = async (email, password, username, photo) => {
    const auth = getAuth();
    setLoading(true);
    setFirebaseError("");
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(auth.currentUser, {
        displayName: username,
        photoURL: photo,
      });
      const user = auth.currentUser;
      setAuthUser({
        ...user,
      });
      setLoading(false);
      toast.success("Account created successfully!");
    } catch (error) {
      setLoading(false);
      setFirebaseError(error.message);
      toast.error(error?.message);
    }
  };
  // login
  const login = async (email, password) => {
    const auth = getAuth();
    setLoading(true);
    setFirebaseLoginError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setLoading(false);
      toast.success("Login successfully!");
    } catch (error) {
      setLoading(false);
      setFirebaseLoginError(error.message);
      toast.error(error?.message);
    }
  };
  // google auth
  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    setFirebaseError("");
    setFirebaseLoginError("");
    try {
      await signInWithPopup(auth, provider);
      const user = auth.currentUser;
      setAuthUser({
        ...user,
      });
      setLoading(false);
      toast.success("Account Succesfully Login With Google!");
    } catch (error) {
      setLoading(false);
      setFirebaseError(error.message);
      toast.error(error?.message);
    }
  };
  // logout
  const logout = () => {
    const auth = getAuth();
    return signOut(auth);
  };
  //   observer auth state changes
  useEffect(() => {
    const auth = getAuth();
    const unSubscribe = onAuthStateChanged(auth, (user) => {
      setAuthUser(user);
      setLoading(false);
    });
    return () => unSubscribe();
  }, []);
  const authValue = {
    signup,
    login,
    signInWithGoogle,
    logout,
    authUser,
    loading,
    firebaseError,
    firebaseLoginError,
  };
  return (
    <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node,
};
