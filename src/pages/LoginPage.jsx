import React, { use, useEffect, useState } from "react";
import logo from "../assets/logo.png";
import { AuthContext } from "../providers/AuthProvide";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { IoLockClosedOutline } from "react-icons/io5";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Link, useLocation, useNavigate } from "react-router";
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

  /*** ----------*** :: HANDLER => GITHUB SIGNIN  :: ***---------- ***/
  const handelGithubSignin = () => {
    toast.warning(`Github signup feature under development stage`);
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
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 sm:p-8">
      <div className="flex w-full h-[800px] lg:h-[700px] max-w-6xl bg-white shadow-2xl rounded-xl overflow-hidden">
        {/* ----------*** :: LEFT SIDE :: ***---------- */}
        <div className="w-full lg:w-1/2 p-8 md:p-12 flex flex-col justify-center items-center">
          <div className="max-w-md w-full">
            <div className="mb-8 flex justify-center">
              <img src={logo} alt="Logo" className="w-20 h-auto sm:w-50" />
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 text-center">
              Sign in to Ankur
            </h1>

            {/* ----------*** :: BTN => GOOGLE SIGNIN :: ***---------- */}
            <div className="flex justify-center space-x-4 mb-6">
              <button
                onClick={handelGoogleSignin}
                type="button"
                disabled={actionLoading}
                className="flex items-center justify-center w-12 h-12 rounded-full border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <FcGoogle size={24} className="sm:size-29" />
              </button>

              {/* ----------*** :: BTN => GITHUB SIGNIN :: ***---------- */}
              <button
                onClick={handelGithubSignin}
                type="button"
                disabled={actionLoading}
                className="flex items-center justify-center w-12 h-12 rounded-full border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <FaGithub size={24} className="sm:size-29" />
              </button>
            </div>

            <div className="flex items-center my-6">
              <hr className="grow border-gray-300" />
              <span className="px-4 text-gray-500 text-sm">
                or use your email account:
              </span>
              <hr className="grow border-gray-300" />
            </div>

            {/* ----------*** :: FORM => LOGIN :: ***---------- */}
            <form onSubmit={handleLogin}>
              {/* ----------*** :: INPUT => EMAIL :: ***---------- */}
              <div className="mb-4">
                <div className="relative flex items-center bg-gray-100 rounded-lg p-3 space-x-2">
                  <MdOutlineEmail size={19} className="text-gray-400" />
                  <input
                    id="login-email"
                    name="email"
                    type="email"
                    placeholder="Email"
                    className="w-full bg-transparent focus:outline-none text-gray-700"
                  />
                </div>
              </div>

              {/* ----------*** :: INPUT => PASSWORD :: ***---------- */}
              <div className="mb-6 relative">
                <div className="relative flex items-center bg-gray-100 rounded-lg p-3 space-x-2">
                  <IoLockClosedOutline size={19} className="text-gray-400" />
                  <input
                    name="password"
                    type={show ? "text" : "password"}
                    placeholder="••••••••"
                    className="w-full bg-transparent focus:outline-none text-gray-700"
                  />
                </div>

                {/* ----------*** :: BTN => EYE :: ***---------- */}
                <span
                  onClick={() => setShow(!show)}
                  className="absolute right-5 top-[15px] cursor-pointer z-50"
                >
                  {show ? (
                    <AiFillEye size={22} />
                  ) : (
                    <AiFillEyeInvisible size={22} />
                  )}
                </span>
              </div>

              {/* ----------*** :: BTN => FORGOT PASSWORD :: ***---------- */}
              <div className="text-sm text-right mb-8">
                <Link
                  onClick={handelForgotPassword}
                  className="text-gray-600 hover:text-gray-800 hover:underline"
                >
                  Forgot your password?
                </Link>
              </div>

              {/* ----------*** :: BTN => SIGNIN :: ***---------- */}
              <button
                disabled={actionLoading}
                className={`w-full py-3 rounded-full text-white font-semibold transition-all duration-300 shadow-md ${
                  actionLoading ? "bg-gray-400 cursor-not-allowed" : "btn-main"
                }`}
              >
                {actionLoading ? "Signing In..." : "SIGN IN"}
              </button>
            </form>

            {/* ----------*** :: BTN => SIGNUP (SM & MD) :: ***---------- */}
            <div className="flex flex-col items-center lg:hidden mt-4 pt-4 border-t border-gray-200">
              <p className="text-gray-500 text-sm mb-3">
                Don't have an account?
              </p>
              <Link
                to="/auth/register"
                className="w-full py-3 rounded-full border-2 border-indigo-600 text-indigo-600 font-semibold text-center"
              >
                SIGN UP
              </Link>
            </div>
          </div>
        </div>

        {/* --- Right Side --- */}
        <div className="hidden lg:flex w-1/2 p-12 flex-col justify-center items-center text-white relative overflow-hidden rounded-r-xl bg-linear-to-r from-[#f2ac27] to-[#e67a37]">
          <div className="relative z-10 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Hello, Friend!
            </h2>
            <p className="text-lg mb-8 max-w-xs leading-relaxed">
              Enter your personal details and start journey with us
            </p>
            <Link
              to="/auth/register"
              className="py-3 px-10 rounded-full border-2 border-white text-white font-semibold hover:bg-white hover:text-gray-800 transition-all duration-300"
            >
              SIGN UP
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
