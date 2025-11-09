import React from "react";
import { Link, useLocation } from "react-router";
import logo from "../assets/logo.png";

/*** ----------*** :: NAVLINKS => DESKTOP :: ***---------- ***/
const navLinksLG = [
  { id: 1, title: "Home", path: "/" },
  { id: 2, title: "All Crops", path: "/allcrops" },
  { id: 3, title: "Add Crops", path: "/addcrops" },
  { id: 4, title: "My Posts", path: "/myposts" },
  { id: 5, title: "My Interests", path: "/myinterests" },
  { id: 6, title: "Profile", path: "/profile" },
];

/*** ----------*** :: NAVLINKS => MOBILE :: ***---------- ***/
const navLinksSM = [
  { id: 1, title: "Home", path: "/" },
  { id: 2, title: "All Crops", path: "/allcrops" },
  { id: 3, title: "Add Crops", path: "/addcrops" },
  { id: 4, title: "My Posts", path: "/myposts" },
  { id: 5, title: "My Interests", path: "/myinterests" },
  { id: 6, title: "Profile", path: "/profile" },
  { id: 7, title: "Login", path: "/auth/login" },
  { id: 8, title: "Register", path: "/auth/register" },
];

const Navbar = () => {
  const location = useLocation();

  return (
    <div className="bg-base-100 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto">
        <div className="navbar">
          {/* ----------*** :: LEFT => MENU :: ***---------- */}
          <div className="navbar-start">
            {/* ----------*** :: MOBILE DROPDOWN :: ***---------- */}
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

              {/* ----------*** :: LEFT SIDE :: ***---------- */}
              <ul
                tabIndex={-1}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-20 mt-3 w-52 p-2 shadow"
              >
                {/* ----------*** :: NAVLINKS => MOBILE :: ***---------- */}
                {navLinksSM.map((link) => (
                  <li key={link.id}>
                    <Link
                      to={link.path}
                      className={`${
                        location.pathname === link.path ? "active" : ""
                      }`}
                    >
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* ----------*** :: NAVLINKS => DESKTOP :: ***---------- */}
            <div className="hidden lg:flex">
              <ul className="menu menu-horizontal px-1">
                {navLinksLG.map((link) => (
                  <li key={link.id}>
                    <Link
                      to={link.path}
                      className={
                        location.pathname === link.path ? "active" : ""
                      }
                    >
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* ----------*** :: CENTER => LOGO :: ***---------- */}
          <div className="navbar-center">
            <Link to="/">
              <img
                src={logo}
                alt="logo"
                className="w-28 md:w-32 h-auto object-contain"
              />
            </Link>
          </div>

          {/* ----------*** :: RIGHT => BUTTON :: ***---------- */}
          <div className="navbar-end space-x-2 hidden lg:flex">
            <Link to="/auth/login" className="btn btn-main">
              Login
            </Link>
            <Link to="/auth/register" className="btn btn-main">
              Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
