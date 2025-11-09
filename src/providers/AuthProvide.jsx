import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
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

  /*** ----------*** :: VARIABLES :: ***---------- ***/
  const auth = getAuth(app);

  /*** ----------*** :: GOOGLE SIGNIN :: ***---------- ***/
  const googelProvider = new GoogleAuthProvider();

  const googleSignin = () => {
    return signInWithPopup(auth, googelProvider);
  };

  /*** ----------*** :: SIGNOUT :: ***---------- ***/
  const logOut = () => {
    return signOut(auth);
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
    googleSignin,
    logOut,
  };

  return (
    <AuthContext.Provider value={authData}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
