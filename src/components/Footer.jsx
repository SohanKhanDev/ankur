import React from "react";
import { Link } from "react-router";
import logo from "../assets/logo.png";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaEnvelope,
  FaPhoneAlt,
} from "react-icons/fa";

/*** ----------*** :: NAVLINKS :: ***---------- ***/
const footerLinks = [
  { title: "Home", path: "/" },
  { title: "All Crops", path: "/allcrops" },
  { title: "My Posts", path: "/myposts" },
  { title: "Profile", path: "/profile" },
];

const legalLinks = [
  { title: "Terms of Service", path: "" },
  { title: "Privacy Policy", path: "" },
  { title: "Sitemap", path: "" },
];

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 pt-12 pb-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 border-b border-gray-700 pb-10">
          {/* --- Column 1: Logo & Mission --- */}
          <div className="col-span-2 md:col-span-2 space-y-4">
            <Link to="/">
              <img
                src={logo}
                alt="Ankur Logo"
                className="w-32 h-auto object-contain "
              />
            </Link>
            <p className="text-sm text-gray-400 max-w-sm">
              Ankur connects the agricultural community—farmers, traders, and
              consumers—in one digital space for efficient commerce and
              communication.
            </p>
            {/* Social Links */}
            <div className="flex space-x-4 pt-2">
              <a
                href="#"
                className="text-[#e67a37] hover:text-[#e67a37] transition-colors duration-300"
              >
                <FaFacebookF size={20} />
              </a>
              <a
                href="#"
                className="text-[#e67a37] hover:text-[#e67a37] transition-colors duration-300"
              >
                <FaTwitter size={20} />
              </a>
              <a
                href="#"
                className="text-[#e67a37] hover:text-[#e67a37] transition-colors duration-300"
              >
                <FaInstagram size={20} />
              </a>
            </div>
          </div>

          {/* --- Column 2: Quick Links --- */}
          <div>
            <h4 className="text-lg font-bold text-white mb-4 border-b-2 border-[#e67a37] inline-block pb-1">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.title}>
                  <Link
                    to={link.path}
                    className={`text-sm text-gray-400 hover:text-[#e67a37] transition-colors duration-300`}
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* --- Column 3: Legal & Resources --- */}
          <div>
            <h4 className="text-lg font-bold text-white mb-4 border-b-2 border-[#e67a37] inline-block pb-1">
              Resources
            </h4>
            <ul className="space-y-2">
              {legalLinks.map((link) => (
                <li key={link.title}>
                  <Link
                    to={link.path}
                    className={`text-sm text-gray-400 hover:text-[#e67a37] transition-colors duration-300`}
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="/help"
                  className={`text-sm text-gray-400 hover:text-[#e67a37] transition-colors duration-300`}
                >
                  Help Center
                </Link>
              </li>
            </ul>
          </div>

          {/* --- Column 4: Contact Info --- */}
          <div className="col-span-2 md:col-span-1">
            <h4 className="text-lg font-bold text-white mb-4 border-b-2 border-[#e67a37] inline-block pb-1">
              Contact Us
            </h4>
            <ul className="space-y-3">
              <li className="flex items-center">
                <FaEnvelope className={`text-[#e67a37] mr-3`} />
                <a
                  href="mailto:support@ankur.com"
                  className={`text-sm text-gray-400 hover:text-[#e67a37] transition-colors duration-300`}
                >
                  support@ankur.com
                </a>
              </li>
              <li className="flex items-center">
                <FaPhoneAlt className={`text-[#e67a37] mr-3`} />
                <a
                  href="tel:+1234567890"
                  className={`text-sm text-gray-400 hover:text-[#e67a37] transition-colors duration-300`}
                >
                  123 456-7890
                </a>
              </li>
              <li className="text-sm text-gray-400">
                House: 2/C/2, Road: 01, Shyamoli, Dhaka
              </li>
            </ul>
          </div>
        </div>

        {/* --- Bottom Footer Bar (Copyright) --- */}
        <div className="pt-6 text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} Ankur. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
