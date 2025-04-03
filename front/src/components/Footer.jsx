import React from "react";

import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-blue-400 text-white w-full py-10 px-4">
      <div className="container mx-auto flex flex-col md:flex-row justify-center items-center mt-10 border-t-2 border-white pt-6">
        <ul className="flex gap-4 mb-4 md:mb-0">
          <li>
            <img src="" alt="" />
          </li>
          <li>
            {/* <Link to="/" className="hover:text-black"> */}이 사이트는
            갱플랭크 유저들의 정보공유를 위해 만들어 운영되고 있습니다.
            건의사항은 qwer@qwer.com으로 연락 바랍니다.
            {/* </Link> */}
          </li>
          {/* <li>
            <Link to="/" className="hover:text-black">
              이용약관
            </Link>
          </li> */}
        </ul>

        {/* <div className="flex gap-6">
          <Link to="https://facebook.com">
            <FaFacebook size={24} />
          </Link>

          <Link to="https://twitter.com">
            <FaTwitter size={24} />
          </Link>

          <Link to="https://twitter.com">
            <FaInstagram size={24} />
          </Link>
        </div> */}
      </div>
    </footer>
  );
};

export default Footer;
