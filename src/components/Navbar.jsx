import React, { use } from "react";
import { Link, NavLink, useLocation } from "react-router";
import logo from "../assets/logo.png";
import profilePhoto from "../assets/profilePhoto.jpg";
import { AuthContext } from "../providers/AuthProvide";
import { toast } from "react-toastify";

/*** ----------*** :: NAVLINK (WITHOUT LOGIN):: ***---------- ***/
const navLinksPublic = [
  { id: 1, title: "Home", path: "/" },
  { id: 2, title: "All Crops", path: "/allcrops" },
];

/*** ----------*** :: NAVLINK (WITH LOGIN):: ***---------- ***/
const navLinksPrivate = [
  { id: 3, title: "Add Crops", path: "/addcrops" },
  { id: 4, title: "My Posts", path: "/myposts" },
  { id: 5, title: "My Interests", path: "/myinterests" },
  { id: 6, title: "Profile", path: "/profile" },
];

/*** ----------*** :: AUTH NAVLINK (SM) :: ***---------- ***/
const navLinksAuth = [
  { id: 7, title: "Login", path: "/auth/login" },
  { id: 8, title: "Register", path: "/auth/register" },
];

/*** ----------*** :: AUTH LOGOUT NAVLINK (SM) :: ***---------- ***/
const navLinksAuthLogout = [{ id: 9, title: "Logout", path: "/auth/logout" }];

const Navbar = () => {
  /*** ----------*** :: HOOKS :: ***---------- ***/
  const { user, setUser, logOut } = use(AuthContext);
  const location = useLocation();

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

  /*** ----------*** :: DYNAMIC NAVLINKS :: ***---------- ***/
  const mobileNavLinks = [
    ...navLinksPublic,
    ...(user ? [...navLinksPrivate, ...navLinksAuthLogout] : navLinksAuth),
  ];

  const desktopNavLinks = [...navLinksPublic, ...(user ? navLinksPrivate : [])];

  return (
    <div className="bg-base-100 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto">
        <div className="navbar">
          <div className="navbar-start">
            <div className="dropdown">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost lg:hidden"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </div>
              {/* ----------*** :: SM NAVLINKS :: ***---------- */}
              <ul
                tabIndex={-1}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-20 mt-3 w-52 p-2 shadow"
              >
                {mobileNavLinks.map((link) => (
                  <li key={link.id}>
                    {link.title === "Logout" ? (
                      <button
                        onClick={handleLogout}
                        className="w-full text-left"
                      >
                        {link.title}
                      </button>
                    ) : (
                      <NavLink
                        to={link.path}
                        className={
                          location.pathname === link.path ? "active" : ""
                        }
                      >
                        {link.title}
                      </NavLink>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* ----------*** :: LG NAVLINKS :: ***---------- */}
            <div className="hidden lg:flex">
              <ul className="menu menu-horizontal px-1">
                {desktopNavLinks.map((link) => (
                  <li key={link.id}>
                    <NavLink
                      to={link.path}
                      className={({ isActive }) =>
                        isActive
                          ? "text-[#e67a37] font-semibold border-b-2 border-[#e67a37]"
                          : "hover:text-[#e67a37] transition-all"
                      }
                    >
                      {link.title}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* ----------*** :: LG => LOGO :: ***---------- */}
          <div className="navbar-center hidden lg:flex">
            <Link to="/">
              <img
                src={logo}
                alt="logo"
                className="w-28 md:w-32 h-auto object-contain" // Restored desktop logo size
              />
            </Link>
          </div>

          <div className="navbar-end space-x-2">
            {/* ----------*** :: SM => LOGO :: ***---------- */}
            <Link to="/" className="lg:hidden">
              <img
                src={logo}
                alt="logo"
                className="w-28 h-auto object-contain"
              />
            </Link>

            {/* ----------*** :: USER PHOTO :: ***---------- */}
            <div className="hidden lg:flex space-x-2">
              {user ? (
                <>
                  <Link to="/profile">
                    <img
                      src={user?.photoURL || profilePhoto}
                      alt="Profile"
                      className="h-10 w-10 rounded-full border-2 border-[#e67a37] shadow-md"
                    />
                  </Link>
                  <button onClick={handleLogout} className="btn btn-main">
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/auth/login" className="btn btn-main">
                    Login
                  </Link>
                  <Link to="/auth/register" className="btn btn-main">
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
