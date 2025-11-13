import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import React, { createContext, useEffect, useState } from "react";
import app from "../firebase/firebase.config";
import LoadingPage from "../pages/LoadingPage";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  /*** ----------*** :: HOOKS :: ***---------- ***/
  const [user, setUser] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [contentLoading, setContentLoading] = useState(true);

  /*** ----------*** :: VARIABLES :: ***---------- ***/
  const auth = getAuth(app);

  /*** ----------*** :: GOOGLE SIGNIN :: ***---------- ***/
  const googelProvider = new GoogleAuthProvider();

  const googleSignin = () => {
    return signInWithPopup(auth, googelProvider);
  };

  /*** ----------*** :: EMAIL & PASSWORD SIGNUP :: ***---------- ***/
  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  /*** ----------*** :: UPDATE USER INFO :: ***---------- ***/
  const updateUser = (updateData) => {
    return updateProfile(auth.currentUser, updateData);
  };

  /*** ----------*** :: EMAIL & PASSWORD SIGNIN :: ***---------- ***/
  const logIn = (email, passwrod) => {
    return signInWithEmailAndPassword(auth, email, passwrod);
  };

  /*** ----------*** :: SIGNOUT :: ***---------- ***/
  const logOut = () => {
    return signOut(auth);
  };

  /*** ----------*** :: RESET PASSWORD :: ***---------- ***/
  const resetPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  /*** ----------*** :: LOGIN/LOGOUT OBSERVER :: ***---------- ***/
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (currentUser) => {
        setUser(currentUser);
        setInitialLoading(false);
      },
      []
    );

    return () => {
      unsubscribe();
    };
  }, [auth]);

  if (initialLoading) {
    return <LoadingPage />;
  }

  const authData = {
    user,
    setUser,
    actionLoading,
    setActionLoading,
    initialLoading,
    setInitialLoading,
    contentLoading,
    setContentLoading,
    googleSignin,
    createUser,
    updateUser,
    logIn,
    logOut,
    resetPassword,
  };

  return (
    <AuthContext.Provider value={authData}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
