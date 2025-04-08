import { Link, useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/API/user/userSlice";
import Axios from "../utils/Axios";
import useLogOut from "../utils/useLogOut";

const navigation = [{ name: "MyPage", href: "/mypage" }];

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state?.user);
  const { logoutUser } = useLogOut();
  console.log("user data", user);

  const handleLogOut = async () => {
    logoutUser();
    dispatch(logout());
    alert("Logout success");
  };

  return (
    <header className="px-4 py-6 top-0 left-2/4 fixed -translate-x-1/2 w-full bg-blue-500 z-50">
      <nav className="mx-auto flex justify-between items-center leading-[0px] w-4/5 text-white">
        <div className="flex items-center md:gap-8 gap-2">
          <Link to="/">
            <img
              src="https://imgup-bucket.s3.ap-northeast-2.amazonaws.com/upload/navgp.jpg"
              alt=""
              className="rounded-full size-16"
            />
          </Link>
          <Link to="/freeboard">
            <div>자유게시판</div>
          </Link>
          <Link to="/chartboard">
            <div>패치별 통계</div>
          </Link>
          <Link to="/news">
            <div>NEWS</div>
          </Link>
        </div>
        <div className="relative">
          {user?._id ? (
            <>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex flex-col items-center gap-1"
              >
                <FaUser className="size-12" />
                <div></div>
                <div className="flex w-[5rem] h-[0.1rem]">
                  <span className="font-bold">{user.name}</span>
                  <span> 님</span>
                </div>
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md z-40">
                  <ul className="py-2">
                    {navigation.map((item) => (
                      <li
                        key={item.name}
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        <Link
                          to={item.href + `/${user?._id}`}
                          className="block px-4 py-2 text-center text-sm hover:bg-gray-100 text-black"
                        >
                          {item.name}
                        </Link>
                      </li>
                    ))}
                    <li>
                      <button
                        onClick={handleLogOut}
                        className="block w-full text-center px-4 py-2 text-sm hover:bg-gray-100 text-black"
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </>
          ) : (
            <>
              <Link to="/login" className="flex flex-col items-center gap-1">
                <img
                  src="https://imgup-bucket.s3.ap-northeast-2.amazonaws.com/upload/collector.jpg"
                  alt=""
                  className="rounded-full size-14 hover:-translate-y-2 transition duration-500 ease-in-out"
                />
                <div></div>
                <div className="w-[5rem] h-[0.1rem] pt-1">
                  <span className="font-bold">로그인</span>
                  <span></span>
                </div>
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
