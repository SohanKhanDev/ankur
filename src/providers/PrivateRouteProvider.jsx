import React, { use } from "react";
import { AuthContext } from "./AuthProvide";
import { Navigate, useLocation } from "react-router";

const PrivateRouteProvider = ({ children }) => {
  /*** ----------*** :: HOOKS :: ***---------- ***/
  const { user, initialLoading } = use(AuthContext);

  const location = useLocation();

  if (initialLoading) {
    return <LoadingPage />;
  }

  if (user && user?.email) {
    return children;
  }

  return <Navigate state={location.pathname} to="/auth/login"></Navigate>;
};

export default PrivateRouteProvider;
