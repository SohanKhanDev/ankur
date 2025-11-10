import React from "react";
import Navbar from "../components/Navbar";
import MyContainer from "../containers/MyContainer";
import Footer from "../components/Footer";
import { Outlet } from "react-router";

const HomeLayout = () => {
  return (
    <div className="main-font  bg-[#f5f9f5]">
      <Navbar />

      <MyContainer>
        <Outlet />
      </MyContainer>

      <Footer />
    </div>
  );
};

export default HomeLayout;
