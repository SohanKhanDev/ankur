import React from "react";
import Navbar from "../components/Navbar";
import MyContainer from "../containers/MyContainer";
import { Outlet } from "react-router";
import Footer from "../components/Footer";

const AuthLayout = () => {
  return (
    <div className="main-font  bg-gray-100">
      <Navbar />

      <MyContainer>
        <Outlet />
      </MyContainer>

      <Footer />
    </div>
  );
};

export default AuthLayout;
