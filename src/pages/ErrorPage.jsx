import React from "react";
import Lottie from "lottie-react";
import errorpage from "../assets/404 error page with cat.json";
import { Link } from "react-router";

const ErrorPage = () => {
  return (
    <div
      className="
        min-h-screen flex flex-col items-center justify-center text-centerp-10 text-white bg-linear-to-r from-[#206a4b] to-[#658727]
      "
    >
      <div className="w-full max-w-sm mx-auto mb-10">
        <Lottie animationData={errorpage} loop={true} />
      </div>

      <p className="text-lg text-center sm:text-xl mb-12 max-w-xl text-gray-100">
        It seems the digital pathway you followed has led to a non-existent
        route.
        <br className="hidden sm:block" />
        Let's get you back to the home page.
      </p>

      <Link to="/">
        <button
          className="
            px-6 
            py-3 
            rounded-full 
            bg-white 
            text-[#658727] 
            font-bold 
            shadow-md 
            hover:bg-[#2b3a10] 
            transition-all 
            duration-300
          "
        >
          BACK TO HOME
        </button>
      </Link>
    </div>
  );
};

export default ErrorPage;
