import React, { use, useEffect } from "react";
import logo from "../assets/logo.png";
import { AuthContext } from "../providers/AuthProvide";
import profilePhoto from "../assets/profilePhoto.jpg";
import { toast } from "react-toastify";
import { FaUserCircle } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { Link } from "react-router";

const ProfilePage = () => {
  /*** ----------*** :: HOOKS :: ***---------- ***/
  const { user, actionLoading, logOut, setUser } = use(AuthContext);

  const { displayName, email, photoURL } = user || {};

  /*** ----------*** :: HANDLER => LOGOUT :: ***---------- ***/
  const handleLogout = () => {
    logOut()
      .then(() => {
        setUser(null);
        toast.success("Signed out successfully! 🎉");
      })
      .catch((error) => {
        toast.error(`Signout failed: ${error.message}`);
      });
  };

  /*** ----------*** :: TITLE SETUP :: ***---------- ***/
  useEffect(() => {
    document.title = "PROFILE | ANKUR";
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-8 bg-[#f5f9f5]">
      <div className="flex w-xl h-auto bg-white shadow-xl rounded-2xl overflow-hidden custom-shadow">
        <div className="w-full  p-8 md:p-12 flex flex-col justify-center items-center">
          <div className="max-w-xs w-full">
            {/* ----------*** :: LOGO :: ***---------- */}
            <div className="mb-3 md:mb-10 text-center">
              <img
                src={logo}
                alt="Logo"
                className="w-40 h-auto sm:w-50 mx-auto"
              />
            </div>

            <h2 className="flex justify-center text-2xl sm:text-4xl md:text-3xl font-bold my-4">
              <span className="text-primary">Your&nbsp;</span>
              <span className="text-secondary">Profile</span>
            </h2>

            {/* ----------*** :: PHOTO DISPLAY :: ***---------- */}
            <div className="mb-8 flex flex-col items-center">
              <img
                className="h-28 w-28 rounded-full border-4 border-[#e67a37] shadow-xl object-cover"
                src={photoURL ? photoURL : profilePhoto}
                alt="Profile"
              />
            </div>

            {/* ----------*** :: NAME DISPLAY :: ***---------- */}
            <div className="mb-4">
              <label className="text-sm text-gray-600 block mb-1">Name</label>
              <div className="relative flex items-center w-full border-b border-gray-300 p-2 text-gray-700 transition duration-150">
                <FaUserCircle size={19} className="text-gray-400 mr-2" />
                <p className="w-full font-semibold truncate">
                  {displayName || "Not Set"}
                </p>
              </div>
            </div>
            {/* ----------*** :: EMAIL DISPLAY :: ***---------- */}
            <div className="mb-8">
              <label className="text-sm text-gray-600 block mb-1">
                Email Address
              </label>
              <div className="relative flex items-center w-full border-b border-gray-300 p-2 text-gray-700 transition duration-150">
                <MdOutlineEmail size={19} className="text-gray-400 mr-2" />
                <p className="w-full font-semibold truncate">
                  {email || "N/A"}
                </p>
              </div>
            </div>

            {user && (
              <div className="flex gap-4">
                {/* ----------*** :: BTN => EDIT PROFILE :: ***---------- */}
                <Link
                  to={"/editprofile"}
                  disabled={actionLoading}
                  className={`btn btn-primary w-1/2 text-center py-3 rounded-lg text-white font-semibold transition-all duration-300 shadow-lg ${
                    actionLoading
                      ? "bg-gray-400 cursor-not-allowed"
                      : "btn-main"
                  }`}
                >
                  EDIT INFO
                </Link>

                {/* ----------*** :: BTN => SIGNOUT :: ***---------- */}
                <button
                  onClick={handleLogout}
                  disabled={actionLoading}
                  className={`btn btn-secondary  w-1/2 text-center py-3 rounded-lg text-white font-semibold transition-all duration-300 shadow-lg ${
                    actionLoading
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-gray-600 hover:bg-gray-700"
                  }`}
                >
                  SIGN OUT
                </button>
              </div>
            )}

            {/* ----------*** :: BTN => BACK TO HOME :: ***---------- */}
            <div className="mt-6 text-center text-sm">
              <Link
                to="/"
                className="text-secondary hover:underline font-medium"
              >
                Go to Home Page
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
