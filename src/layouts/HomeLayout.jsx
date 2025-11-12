import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import MyContainer from "../containers/MyContainer";
import Footer from "../components/Footer";
import { Outlet, useLocation } from "react-router";
import LoadingPage from "../pages/LoadingPage";

const HomeLayout = () => {
  const location = useLocation();
  const [routeloading, setRouteloading] = useState(false);

  useEffect(() => {
    setRouteloading(true);
    const timer = setTimeout(() => {
      setRouteloading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, [location]);

  if (routeloading) {
    return <LoadingPage />;
  }

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
