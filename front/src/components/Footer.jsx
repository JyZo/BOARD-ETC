import React from "react";
// import footerLogo from "../assets/footer-logo.png";

import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-blue-400 text-white py-10 px-4">
      <div className="container mx-auto flex flex-col md:flex-row justify-around items-center mt-10 border-t-2 border-white pt-6">
        <ul className="flex gap-4 mb-4 md:mb-0">
          <li>
            <Link to="/" className="hover:text-black">
              소개
            </Link>
          </li>
          <li>
            <Link to="/" className="hover:text-black">
              이용약관
            </Link>
          </li>
        </ul>

        <div className="flex gap-6">
          <Link to="https://facebook.com">
            <FaFacebook size={24} />
          </Link>

          <Link to="https://twitter.com">
            <FaTwitter size={24} />
          </Link>

          <Link to="https://twitter.com">
            <FaInstagram size={24} />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
