import React, { useEffect, use } from "react";
import logo from "../assets/logo.png";
import profilePhoto from "../assets/profilePhoto.jpg";
import { AuthContext } from "../providers/AuthProvide";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router";
import { FaUserCircle } from "react-icons/fa";
import { MdOutlinePhotoCamera } from "react-icons/md";

const ProfileEditPage = () => {
  /*** ----------*** :: HOOKS :: ***---------- ***/
  const { user, actionLoading, setActionLoading, updateUser, setUser } =
    use(AuthContext);

  const navigate = useNavigate();

  const { displayName, photoURL } = user || {};

  /*** ----------*** :: HANDLER => UPDATE PROFILE  :: ***---------- ***/
  const handleUpdateProfile = (event) => {
    event.preventDefault();
    setActionLoading(true);

    const name = event.target.name.value;
    const photourl = event.target.photourl.value;

    updateUser({ displayName: name, photoURL: photourl })
      .then(() => {
        setUser({ ...user, displayName: name, photoURL: photourl });
        toast.success("Profile updated successfully! 🎉");
        navigate("/profile");
      })
      .catch((error) => {
        toast.error(`Error updating profile: ${error.message}`);
      })
      .finally(() => {
        setActionLoading(false);
      });

    fetch(`http://ankur-server-ten.vercel.app/users/edit?email=${user.email}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        image: photourl,
      }),
    })
      .then((res) => res.json())
      .then(() => {})
      .catch(() => toast.error("Error"));
  };

  /*** ----------*** :: TITLE SETUP :: ***---------- ***/
  useEffect(() => {
    document.title = "EDIT PROFILE | ANKUR";
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-8 bg-[#f5f9f5]">
      <div className="flex w-xl h-auto bg-white shadow-xl rounded-2xl overflow-hidden custom-shadow">
        <div className="w-full p-8 md:p-12 flex flex-col justify-center items-center">
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
              <span className="text-primary">Edit&nbsp;</span>
              <span className="text-secondary">Your Profile</span>
            </h2>

            <img
              className="h-28 w-28 rounded-full border-4 border-[#e67a37] shadow-xl object-cover  mx-auto"
              src={photoURL ? photoURL : profilePhoto}
              alt="Profile"
            />

            <form onSubmit={handleUpdateProfile}>
              {/* ----------*** :: NAME INPUT :: ***---------- */}
              <div className="mb-6">
                <label className="text-sm text-gray-600 block mb-1">
                  Full Name
                </label>
                <div className="relative flex items-center border-b border-gray-300 p-2">
                  <FaUserCircle size={20} className="text-gray-400 mr-2" />
                  <input
                    type="text"
                    name="name"
                    defaultValue={displayName || ""}
                    placeholder="Enter your name"
                    className="w-full outline-none text-gray-700 font-medium bg-transparent"
                  />
                </div>
              </div>

              {/* ----------*** :: PHOTO INPUT :: ***---------- */}
              <div className="mb-8 flex flex-col items-center">
                <div className="mt-3 w-full">
                  <label className="text-sm text-gray-600 block mb-1">
                    Photo URL
                  </label>
                  <div className="relative flex items-center border-b border-gray-300 p-2">
                    <MdOutlinePhotoCamera
                      size={20}
                      className="text-gray-400 mr-2"
                    />
                    <input
                      type="text"
                      name="photourl"
                      defaultValue={photoURL || ""}
                      placeholder="Enter new photo URL"
                      className="w-full outline-none text-gray-700 font-medium bg-transparent"
                    />
                  </div>
                </div>
              </div>

              {/* ----------*** :: BUTTONS :: ***---------- */}
              <div className="flex gap-4 mt-8">
                <button
                  type="submit"
                  disabled={actionLoading}
                  className={`btn btn-primary w-1/2 text-center py-3 rounded-lg text-white font-semibold transition-all duration-300 shadow-lg ${
                    actionLoading
                      ? "bg-gray-400 cursor-not-allowed"
                      : "btn-main"
                  }`}
                >
                  {actionLoading ? "Changing..." : "CHANGES"}
                </button>

                <Link
                  to="/profile"
                  className="btn btn-secondary  w-1/2 text-center py-3 rounded-lg text-white font-semibold transition-all duration-300 shadow-lg"
                >
                  CANCEL
                </Link>
              </div>
            </form>

            {/* ----------*** :: HOME NAVIGATION :: ***---------- */}
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

export default ProfileEditPage;
