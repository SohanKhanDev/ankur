import React, { use, useEffect, useState } from "react";
import { AuthContext } from "../providers/AuthProvide";
import logo from "../assets/logo.png";
import imgage from "../assets/register-img.jpg";
import { Link, useNavigate } from "react-router";
import { FcGoogle } from "react-icons/fc";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { toast } from "react-toastify";

const RegisterPage = () => {
  /*** ----------*** :: HOOKS :: ***---------- ***/
  const {
    setUser,
    actionLoading,
    setActionLoading,
    googleSignin,
    createUser,
    updateUser,
  } = use(AuthContext);
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  /*** ----------*** :: HANDLER => GOOGLE SIGNIN :: ***---------- ***/
  const handelGoogleSignin = () => {
    googleSignin()
      .then((result) => {
        const user = result.user;
        setUser(user);
        toast.success("Google Signup Successfully! 🎉");
        navigate("/");
      })
      .catch((error) => {
        toast.error(`Registration failed: ${error.message}`);
      });
  };

  /*** ----------*** :: HANDLER => EMAIL & PASSWORD SIGNUP :: ***---------- ***/
  const handelRegister = (e) => {
    e.preventDefault();
    setActionLoading(true);

    /*** ----------*** :: GET VALUES FROM INPUT :: ***---------- ***/
    const name = e.target.name.value;
    const photourl = e.target.photourl.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    /*** ----------*** :: PASSWORD VALIDATION :: ***---------- ***/
    // This regex requires: at least 6 characters, one lowercase, one uppercase, one digit, one special character
    const regExp =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

    if (!regExp.test(password)) {
      toast.error(
        "Password must be at least 6 characters long and include one uppercase letter, one lowercase letter, one number, and one special character."
      );
      setActionLoading(false);
      return;
    }

    /*** ----------*** :: CREATE USER :: ***---------- ***/
    createUser(email, password)
      .then((result) => {
        const user = result.user;

        /*** ----------*** :: UPDATE USER :: ***---------- ***/
        updateUser({ displayName: name, photoURL: photourl })
          .then(() => {
            setUser({ ...user, displayName: name, photoURL: photourl });
            toast.success("User Created Successfully! 🎉");
            navigate("/");
          })
          .catch((error) => {
            toast.error(`Error setting profile info: ${error.message}`);
          })
          .finally(() => {
            setActionLoading(false);
          });
      })
      .catch((error) => {
        toast.error(`Registration failed: ${error.message}`);
      })
      .finally(() => {
        setActionLoading(false);
      });
  };

  /*** ----------*** :: TITLE SETUP :: ***---------- ***/
  useEffect(() => {
    document.title = "REGISTER | ANKUR";
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-8 bg-[#f5f9f5]">
      <div
        className="flex w-full max-w-5xl h-auto bg-white shadow-xl rounded-2xl overflow-hidden custom-shadow
        "
      >
        {/* ----------*** :: LEFT SIDE :: ***---------- */}
        <div className="w-full lg:w-1/2 p-8 md:p-12 flex flex-col justify-center items-center">
          <div className="max-w-xs w-full">
            {/* ----------*** :: LOGO :: ***---------- */}
            <div className="mb-3 md:mb-10 text-center">
              <img
                src={logo}
                alt="Logo"
                className="w-40 h-auto sm:w-50 mx-auto"
              />
            </div>

            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
              Create Account
            </h2>

            {/* ----------*** :: FORM => REGISTRATION :: ***---------- */}
            <form onSubmit={handelRegister}>
              {/* ----------*** :: INPUT => NAME :: ***---------- */}
              <div className="mb-4">
                <label
                  htmlFor="register-name"
                  className="text-sm text-gray-600 block mb-1"
                >
                  Name
                </label>
                <input
                  id="register-name"
                  name="name"
                  type="text"
                  placeholder="Your Name"
                  className="w-full border-b border-gray-300 focus:border-[#2a875f] focus:outline-none p-2 text-gray-700 placeholder-gray-400 transition duration-150"
                  required
                />
              </div>

              {/* ----------*** :: INPUT => Photo URL :: ***---------- */}
              <div className="mb-4">
                <label
                  htmlFor="register-photourl"
                  className="text-sm text-gray-600 block mb-1"
                >
                  Photo URL (Optional)
                </label>
                <input
                  id="register-photourl"
                  name="photourl"
                  type="text"
                  placeholder="Link to your profile picture"
                  className="w-full border-b border-gray-300 focus:border-[#2a875f] focus:outline-none p-2 text-gray-700 placeholder-gray-400 transition duration-150"
                />
              </div>

              {/* ----------*** :: INPUT => EMAIL :: ***---------- */}
              <div className="mb-4">
                <label
                  htmlFor="register-email"
                  className="text-sm text-gray-600 block mb-1"
                >
                  Email
                </label>
                <input
                  id="register-email"
                  name="email"
                  type="email"
                  placeholder="your@email.com"
                  className="w-full border-b border-gray-300 focus:border-[#2a875f] focus:outline-none p-2 text-gray-700 placeholder-gray-400 transition duration-150"
                  required
                />
              </div>

              {/* ----------*** :: INPUT => PASSWORD :: ***---------- */}
              <div className="mb-6 relative">
                <label
                  htmlFor="register-password"
                  className="text-sm text-gray-600 block mb-1"
                >
                  Password
                </label>
                <input
                  id="register-password"
                  name="password"
                  type={show ? "text" : "password"}
                  placeholder="••••••••"
                  className="w-full border-b border-gray-300 focus:border-[#2a875f] focus:outline-none p-2 text-gray-700 placeholder-gray-400 transition duration-150"
                  required
                />

                {/* ----------*** :: BTN => EYE :: ***---------- */}
                <span
                  onClick={() => setShow(!show)}
                  className="absolute right-0 bottom-2.5 cursor-pointer text-gray-500 hover:text-[#2a875f]"
                >
                  {show ? (
                    <AiFillEye size={20} />
                  ) : (
                    <AiFillEyeInvisible size={20} />
                  )}
                </span>
              </div>

              {/* ----------*** :: BTN => SIGNUP :: ***---------- */}
              <button
                type="submit"
                disabled={actionLoading}
                className={`w-full py-3 rounded-lg text-white font-semibold transition-all duration-300 shadow-lg 
                  ${
                    actionLoading
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-[#2a875f] hover:bg-[#206a4b]" // Using the dark green from the logo for the main button
                  }`}
              >
                {actionLoading ? "Creating Account..." : "SIGN UP"}
              </button>
            </form>

            {/* ----------*** :: OR DIVIDER :: ***---------- */}
            <div className="flex items-center my-6">
              <hr className="grow border-gray-200" />
              <span className="px-4 text-gray-400 text-sm font-medium">or</span>
              <hr className="grow border-gray-200" />
            </div>

            {/* ----------*** :: BTN => GOOGLE SIGNIN :: ***---------- */}
            <button
              onClick={handelGoogleSignin}
              type="button"
              disabled={actionLoading}
              className="flex items-center justify-center w-full py-2.5 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors shadow-sm"
            >
              <FcGoogle size={24} className="mr-3" />
              <span className="font-medium text-sm">Sign in with Google</span>
            </button>

            {/* ----------*** :: NAVIGATION => LOGIN :: ***---------- */}
            <div className="text-center mt-6">
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <Link
                  to="/auth/login"
                  className="font-medium text-[#2a875f] hover:underline"
                >
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* ----------*** :: RIGHT SIDE :: ***---------- */}
        <div
          className="
            hidden lg:flex 
            w-1/2 
            p-12 
            flex-col 
            justify-center 
            items-center 
            text-white 
            relative 
            rounded-r-2xl 
            bg-cover 
            bg-center 
            bg-no-repeat
          "
          style={{ backgroundImage: `url(${imgage})` }}
        >
          <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 text-center shadow-md mt-90">
            <h2 className="text-3xl font-bold mb-3 text-[#2a875f]">
              Welcome to Ankur
            </h2>
            <p className="text-base text-center max-w-sm leading-relaxed text-gray-600 mx-auto">
              Ankur is a modern web application that connects people in the
              agricultural sector such as farmers, traders, and consumers in one
              digital space.
            </p>
          </div>

          <div className="absolute bottom-10 flex space-x-2">
            <span className="w-2 h-2 bg-gray-300 rounded-full"></span>{" "}
            <span className="w-2 h-2 bg-[#2a875f] rounded-full"></span>{" "}
            <span className="w-2 h-2 bg-gray-300 rounded-full"></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
