import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { useState } from "react";
import { useSelector } from "react-redux";

const navigation = [{ name: "MyPage", href: "/mypage" }];

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const currentUser = false;
  const token = false;
  const user = useSelector((state) => state?.user);
  console.log("user data", user);

  const handleLogOut = () => {
    console.log("logout");
  };

  return (
    <header className="px-4 py-6 top-0 left-2/4 fixed -translate-x-1/2 w-full bg-blue-500">
      <nav className="mx-auto flex justify-between items-center leading-[0px] w-4/5 text-white">
        {/* left side */}
        <div className="flex items-center md:gap-8 gap-2">
          <Link to="/">
            <FaHome className="size-12" />
          </Link>
          <Link to="/freeboard">
            <div>자유게시판</div>
          </Link>
          <Link to="/snack">
            <div>과자</div>
          </Link>
          <Link to="/news">
            <div>NEWS</div>
          </Link>
        </div>
        <div className="relative flex items-center md:space-x-3 space-x-2">
          <div>
            {currentUser ? (
              <>
                <button onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                  <FaRegUser className="size-12" />
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
                            to={item.href}
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
                <Link to="/login">
                  <FaUser className="size-12" />
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
