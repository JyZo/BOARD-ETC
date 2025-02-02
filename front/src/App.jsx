import "./App.css";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { useEffect } from "react";
import fetchUserDetail from "./utils/fetchUserDetail";
import { useDispatch } from "react-redux";
import { setUserDetails } from "./redux/API/user/userSlice";

function App() {
  const dispatch = useDispatch();

  const fetchUser = async () => {
    const userData = await fetchUserDetail();
    console.log("userdata", userData.data);
    dispatch(setUserDetails(userData.data));
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <>
      <Navbar />
      <main className="min-h-screen max-w-screen-2xl mx-auto px-2 pt-24 font-sans w-4/5">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default App;
