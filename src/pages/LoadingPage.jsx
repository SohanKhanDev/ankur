import React from "react";
import loading from "../assets/loading.json";
import Lottie from "lottie-react";

const LoadingPage = () => {
  return (
    <div className="w-full max-w-sm mx-auto flex justify-center items-center">
      <Lottie animationData={loading} loop={true} />
    </div>
  );
};

export default LoadingPage;
