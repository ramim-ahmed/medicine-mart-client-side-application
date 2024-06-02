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
import useBaseApi from "@/hooks/useBaseApi";
export const AuthContext = createContext();
export default function AuthProvider({ children }) {
  const baseApi = useBaseApi();
  const [authUser, setAuthUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [firebaseError, setFirebaseError] = useState("");
  const [firebaseLoginError, setFirebaseLoginError] = useState("");
  // signup
  const signup = async (email, password, username, photo, role) => {
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
      toast.success("Account created successfully!");
      await saveUserInDB(auth.currentUser, role);
    } catch (error) {
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
      toast.success("Login successfully!");
    } catch (error) {
      setFirebaseLoginError(error.message);
      toast.error(error?.message);
    }
  };
  // google auth
  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    setLoading(true);
    setFirebaseError("");
    setFirebaseLoginError("");
    try {
      await signInWithPopup(auth, provider);
      const user = auth.currentUser;
      setAuthUser({
        ...user,
      });
      toast.success("Account Succesfully Login With Google!");
      await saveUserInDB(auth.currentUser, "USER");
    } catch (error) {
      setFirebaseError(error.message);
      toast.error(error?.message);
    }
  };
  // logout
  const logout = () => {
    const auth = getAuth();
    return signOut(auth);
  };

  const saveUserInDB = async (currentUser, role = "USER") => {
    const user = {
      name: currentUser?.displayName,
      email: currentUser?.email,
      photo: currentUser?.photoURL,
      role,
    };
    console.log({ currentUser, role });
    try {
      await baseApi.post("/users/create-new", user);
      console.log("user-created-in-db");
    } catch (error) {
      console.log("user-created-to-db-failed");
    }
  };
  //   observer auth state changes
  useEffect(() => {
    const auth = getAuth();
    const unSubscribe = onAuthStateChanged(auth, async (user) => {
      setAuthUser(user);

      if (user) {
        // set access token
        const currentUser = { email: user?.email };
        const { data } = await baseApi.post(
          "/token/create-access-token",
          currentUser
        );
        localStorage.setItem("access-token", data?.token);
        setLoading(false);
      } else {
        // clear access token
        localStorage.removeItem("access-token");
        setLoading(false);
      }
    });
    return () => unSubscribe();
  }, [baseApi]);
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
