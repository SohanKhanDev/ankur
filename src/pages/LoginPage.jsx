import React, { use, useEffect, useState } from "react";
import logo from "../assets/logo.png";
import imgage from "../assets/login-img.jpg";
import { AuthContext } from "../providers/AuthProvide";
import { FcGoogle } from "react-icons/fc";
// Removed unused icons for a cleaner look: FaGithub, MdOutlineEmail, IoLockClosedOutline
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Link, useLocation, useNavigate } from "react-router"; // Use Link from react-router-dom
import { toast } from "react-toastify";

const LoginPage = () => {
  /*** ----------*** :: HOOKS :: ***---------- ***/
  const { setUser, actionLoading, setActionLoading, googleSignin, logIn } =
    use(AuthContext);

  const [show, setShow] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  /*** ----------*** :: HANDLER => GOOGLE SIGNIN  :: ***---------- ***/
  const handelGoogleSignin = () => {
    googleSignin()
      .then((result) => {
        const user = result.user;
        setUser(user);
        toast.success("Google Signin Successfully! 🎉");
        navigate("/");
      })
      .catch((error) => {
        toast.error(`Signin failed: ${error.message}`);
      });
  };

  /*** ----------*** :: HANDLER => EMAIL & PASSWORD SIGNIN  :: ***---------- ***/
  const handleLogin = (e) => {
    e.preventDefault();
    setActionLoading(true);

    /*** ----------*** :: GET VALUES FROM INPUT  :: ***---------- ***/
    const email = e.target.email.value;
    const password = e.target.password.value;

    /*** ----------*** :: LOGIN USER  :: ***---------- ***/
    logIn(email, password)
      .then((result) => {
        const user = result.user;
        setUser(user);
        toast.success("Signin Successfully! 🎉");
        navigate(`${location.state ? location.state : "/"}`);
      })
      .catch((error) => {
        toast.error(`Signin failed: ${error.message}`);
      })
      .finally(() => {
        setActionLoading(false);
      });
  };

  /*** ----------*** :: LOGIN USER  :: ***---------- ***/
  const handelForgotPassword = () => {
    const emailInput = document.getElementById("login-email");
    const currentEmail = emailInput
      ? emailInput.value || "no-email"
      : "no-email";
    navigate(`/auth/forgot/${currentEmail}`);
  };

  /*** ----------*** :: TITLE SETUP :: ***---------- ***/
  useEffect(() => {
    document.title = "LOGIN | ANKUR";
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-8 ">
      <div
        className="flex w-full max-w-5xl h-auto bg-white shadow-xl rounded-2xl overflow-hidden custom-shadow
        "
      >
        {/* ----------*** :: LEFT SIDE :: ***---------- */}
        <div
          className="hidden lg:flex w-1/2 p-12 flex-col justify-center items-center  text-gray-800 relative rounded-l-2xl bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${imgage})`,
          }}
        >
          <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 text-center shadow-md mt-90">
            <h2 className="text-3xl font-bold mb-3 text-[#2a875f]">
              Welcome Back
            </h2>

            <p className="text-base text-center max-w-sm leading-relaxed text-gray-600">
              Glad to see you again! Log in to continue your journey with Ankur.
            </p>
          </div>

          <div className="absolute bottom-10 flex space-x-2">
            <span className="w-2 h-2 bg-[#2a875f] rounded-full"></span>
            <span className="w-2 h-2 bg-gray-300 rounded-full"></span>
            <span className="w-2 h-2 bg-gray-300 rounded-full"></span>
          </div>
        </div>

        {/* ----------*** :: RIGHT SIDE :: ***---------- */}
        <div className="w-full lg:w-1/2 p-8 md:p-12 flex flex-col justify-center items-center">
          <div className="max-w-xs w-full">
            {/* ----------*** :: LOGO :: ***---------- */}
            <div className="mb-3 md:mb-10 text-center">
              <img
                src={logo}
                alt="Logo"
                className="w-40 h-auto sm:w-50 mx-auto mb-2"
              />
            </div>

            <h2 className="text-3xl font-bold text-gray-800 mb-2 md:mb-6 text-center">
              Login!!
            </h2>

            {/* ----------*** :: FORM => LOGIN :: ***---------- */}
            <form onSubmit={handleLogin}>
              {/* ----------*** :: INPUT => EMAIL :: ***---------- */}
              <div className="mb-2 md:mb-4">
                <label
                  htmlFor="login-email"
                  className="text-sm text-gray-600 block mb-1"
                >
                  Email
                </label>

                <input
                  id="login-email"
                  name="email"
                  type="email"
                  placeholder="enter your email"
                  className="w-full border-b border-gray-300 focus:border-[#2a875f] focus:outline-none p-2 text-gray-700 placeholder-gray-400 transition duration-150"
                />
              </div>

              {/* ----------*** :: INPUT => PASSWORD :: ***---------- */}
              <div className="mb-2 relative">
                <label className="text-sm text-gray-600 block mb-1">
                  Password
                </label>
                <input
                  id="login-password"
                  name="password"
                  type={show ? "text" : "password"}
                  placeholder="••••••••"
                  className="w-full border-b border-gray-300 focus:border-[#2a875f] focus:outline-none p-2 text-gray-700 placeholder-gray-400 transition duration-150"
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

              {/* ----------*** :: BTN => FORGOT PASSWORD :: ***---------- */}
              <div className="text-right md-2 md:mb-6">
                <Link
                  onClick={handelForgotPassword}
                  className="text-sm text-[#2a875f] hover:underline"
                >
                  Forgot password?
                </Link>
              </div>

              {/* ----------*** :: BTN => SIGNIN :: ***---------- */}
              <button
                disabled={actionLoading}
                className={`btn-main w-full
                  ${actionLoading && "bg-gray-400 cursor-not-allowed"}`}
              >
                {actionLoading ? "Signing In..." : "Sign in"}
              </button>
            </form>

            {/* ----------*** :: OR DIVIDER :: ***---------- */}
            <div className="flex items-center my-2 md:my-6">
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

            {/* ----------*** :: NAVIGATION => REGISTER :: ***---------- */}
            <div className="text-center mt-6">
              <p className="text-sm text-gray-600">
                Are you new?{" "}
                <Link
                  to="/auth/register"
                  className="font-medium text-[#2a875f] hover:underline"
                >
                  Create an Account
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
