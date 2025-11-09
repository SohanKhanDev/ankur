import React, { use, useEffect, useState } from "react";
import { AuthContext } from "../providers/AuthProvide";
import logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { IoLockClosedOutline, IoPersonOutline } from "react-icons/io5";
import { MdOutlineAddPhotoAlternate, MdOutlineEmail } from "react-icons/md";
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

  /*** ----------*** :: HANDLER => GOOGLE SIGNIN  :: ***---------- ***/
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

  /*** ----------*** :: HANDLER => GITHUB SIGNIN  :: ***---------- ***/
  const handelGithubSignin = () => {
    toast.warning(`Github signup feature under development stage`);
  };

  /*** ----------*** :: HANDLER => EMAIL & PASSWORD SIGNUP  :: ***---------- ***/
  const handelRegister = (e) => {
    e.preventDefault();
    setActionLoading(true);

    /*** ----------*** :: GET VALUES FROM INPUT  :: ***---------- ***/
    const name = e.target.name.value;
    const photourl = e.target.photourl.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    /*** ----------*** :: PASSWORD VALIDATION  :: ***---------- ***/
    const regExp =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

    if (!regExp.test(password)) {
      toast.error("Password does not meet requirements");
      setActionLoading(false);
      return;
    }

    /*** ----------*** :: CREATE USER  :: ***---------- ***/
    createUser(email, password)
      .then((result) => {
        const user = result.user;

        /*** ----------*** :: UPDATE USER  :: ***---------- ***/
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
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 sm:p-8">
      <div className="flex w-full h-[800px] lg:h-[700px] max-w-6xl bg-white shadow-2xl rounded-xl overflow-hidden">
        {/* ----------*** :: LEFT SIDE :: ***---------- */}
        <div className="hidden lg:flex w-1/2 p-12 flex-col justify-center items-center text-white relative overflow-hidden rounded-r-xl bg-linear-to-r from-[#f2ac27] to-[#e67a37]">
          <div className="relative z-10 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Welcome Back!
            </h2>

            <p className="text-lg mb-8 max-w-xs leading-relaxed">
              To keep connected with us please login with your personal info
            </p>

            <Link
              to="/auth/login"
              className="py-3 px-10 rounded-full border-2 border-white text-white font-semibold hover:bg-white hover:text-gray-800 transition-all duration-300"
            >
              SIGN IN
            </Link>
          </div>
        </div>

        {/* ----------*** :: RIGHT SIDE :: ***---------- */}
        <div className="w-full lg:w-1/2 p-6 sm:p-8 md:p-12 flex flex-col justify-center items-center">
          <form onSubmit={handelRegister} className="max-w-md w-full">
            <div className="mb-8 flex justify-center">
              <img src={logo} alt="Logo" className="w-20 h-auto sm:w-50" />
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 text-center">
              Create Account
            </h1>

            {/* ----------*** :: BTN => GOOGLE SIGNIN :: ***---------- */}
            <div className="flex justify-center space-x-3 sm:space-x-4 mb-6">
              <button
                onClick={handelGoogleSignin}
                type="button"
                className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <FcGoogle size={24} className="sm:size-29" />
              </button>

              {/* ----------*** :: BTN => GITHUB SIGNIN :: ***---------- */}
              <button
                onClick={handelGithubSignin}
                type="button"
                className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <FaGithub size={24} className="sm:size-29" />
              </button>
            </div>

            <div className="flex items-center my-6">
              <hr className="grow border-gray-300" />
              <span className="px-3 text-gray-500 text-xs sm:text-sm whitespace-nowrap">
                or use your email for registration:
              </span>
              <hr className="grow border-gray-300" />
            </div>

            {/* ----------*** :: FORM => REGISTRATION :: ***---------- */}
            {/* ----------*** :: INPUT => NAME :: ***---------- */}
            {/* --- name input --- */}
            <div className="mb-4">
              <div className="relative flex items-center bg-gray-100 rounded-lg p-3 space-x-2">
                <IoPersonOutline size={19} className="text-gray-400" />
                <input
                  name="name"
                  type="text"
                  placeholder="Name"
                  className="w-full bg-transparent focus:outline-none text-gray-700"
                />
              </div>
            </div>

            {/* ----------*** :: INPUT => PHOTO URL :: ***---------- */}
            <div className="mb-4">
              <div className="relative flex items-center bg-gray-100 rounded-lg p-3 space-x-2">
                <MdOutlineAddPhotoAlternate
                  size={19}
                  className="text-gray-400"
                />
                <input
                  name="photourl"
                  type="text"
                  placeholder="Photo URL"
                  className="w-full bg-transparent focus:outline-none text-gray-700"
                />
              </div>
            </div>

            {/* ----------*** :: INPUT => EMAIL :: ***---------- */}
            <div className="mb-4">
              <div className="relative flex items-center bg-gray-100 rounded-lg p-3 space-x-2">
                <MdOutlineEmail size={19} className="text-gray-400" />
                <input
                  name="email"
                  type="email"
                  placeholder="Email"
                  className="w-full bg-transparent focus:outline-none text-gray-700"
                />
              </div>
            </div>

            {/* ----------*** :: INPUT => PASSWORD :: ***---------- */}
            <div className="mb-8 relative">
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

            {/* ----------*** :: BTN => SIGNUP :: ***---------- */}
            <button
              type="submit"
              disabled={actionLoading}
              className={`w-full py-3 rounded-full text-white font-semibold transition-all duration-300 shadow-md ${
                actionLoading ? "bg-gray-400 cursor-not-allowed" : "btn-main"
              }`}
            >
              {actionLoading ? "Creating Account..." : "SIGN UP"}
            </button>

            {/* ----------*** :: BTN => SIGNUP (SM & MD) :: ***---------- */}
            <div className="flex flex-col items-center lg:hidden mt-4 pt-4 border-t border-gray-200">
              <p className="text-gray-500 text-sm mb-3">
                Don't have an account?
              </p>
              <Link
                to="/auth/login"
                className="w-full py-3 rounded-full border-2 border-indigo-600 text-indigo-600 font-semibold text-center"
              >
                SIGN IN
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
