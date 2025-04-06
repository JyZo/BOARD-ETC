import React from "react";

import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-blue-400 text-white w-full py-10 px-4">
      <div className="container mx-auto flex flex-col md:flex-row justify-center items-center mt-10 border-t-2 border-white pt-6">
        <ul className="flex gap-4 mb-4 md:mb-0">
          <li>
            <img
              src="https://imgup-bucket.s3.ap-northeast-2.amazonaws.com/upload/footergp.jpg"
              alt=""
              className="rounded-full size-16"
            />
          </li>
          <li className="text-center flex items-center">
            이 사이트는 갱플랭크 유저들의 정보공유를 위해 만들어 운영되고
            있습니다. 건의사항은 qwer@qwer.com으로 연락 바랍니다.
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
