import React, { use, useEffect, useState } from "react";
import logo from "../assets/logo.png";
import { AuthContext } from "../providers/AuthProvide";
import { Link, useParams } from "react-router";
import { toast } from "react-toastify";
import { MdOutlineEmail } from "react-icons/md";

const ForgotPasswordPage = () => {
  /*** ----------*** :: HOOKS :: ***---------- ***/
  const { actionLoading, setActionLoading, resetPassword } = use(AuthContext);

  const { prefilledEmail } = useParams();
  const initialEmail =
    prefilledEmail === "no-email" || !prefilledEmail ? "" : prefilledEmail;

  const [email, setEmail] = useState(initialEmail);

  /*** ----------*** :: HANDLER => RESET PASSWORD  :: ***---------- ***/
  const handleResetPassword = (event) => {
    event.preventDefault();
    setActionLoading(true);

    const currentEmail = email.trim();

    if (!currentEmail) {
      toast.error("Input your email");
      setActionLoading(false);
      return;
    }

    resetPassword(email)
      .then(() => {
        toast.success(
          `Password reset link sent to ${currentEmail}! Please check your email.`
        );
      })
      .catch((error) => {
        toast.error(`Reset failed: ${error.message}`);
      })
      .finally(() => {
        setActionLoading(false);
      });
  };

  /*** ----------*** :: TITLE SETUP :: ***---------- ***/
  useEffect(() => {
    document.title = "RESET PASSWORD | ANKUR";
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-8">
      <div className="flex  h-[800px] lg:h-[700px] bg-white/80 backdrop-blur-md shadow-2xl rounded-xl overflow-hidden border border-gray-200">
        {/* ----------*** :: LEFT SIDE :: ***---------- */}
        <div className="  p-8 md:p-12 flex flex-col justify-center items-center">
          <div className="max-w-md w-full">
            <div className="mb-8 flex justify-center">
              <img src={logo} alt="Logo" className="w-20 h-auto sm:w-50" />
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 text-center">
              Reset Password
            </h1>
            <p className="text-center text-gray-500 mb-8 text-sm leading-relaxed">
              Enter your email address below. We will send you a secure link to
              reset your password instantly.
            </p>

            {/* ----------*** :: FORM => RESET PASSWORD :: ***---------- */}
            <form onSubmit={handleResetPassword}>
              {/* ----------*** :: INPUT => EMAIL :: ***---------- */}
              <div className="mb-8">
                <div className="relative flex items-center bg-gray-100 rounded-lg p-3 space-x-2">
                  <MdOutlineEmail size={19} className="text-gray-400" />
                  <input
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    placeholder="Registered Email Address"
                    className="w-full bg-transparent focus:outline-none text-gray-700"
                    required
                    disabled={actionLoading}
                  />
                </div>
              </div>

              {/* ----------*** :: BTN => RESET :: ***---------- */}
              <button
                type="submit"
                disabled={actionLoading}
                className={`w-full py-3 rounded-full text-white font-semibold transition-all duration-300 shadow-md ${
                  actionLoading ? "bg-gray-400 cursor-not-allowed" : "btn-main"
                }`}
              >
                {actionLoading ? "SENDING LINK..." : "SEND RESET LINK"}
              </button>

              {/* ----------*** :: BTN => BACK TO LOGIN :: ***---------- */}
              <div className="mt-6 text-center text-sm">
                <Link
                  to="/auth/login"
                  className="text-[#e67a37] hover:underline"
                >
                  Back to Login
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
