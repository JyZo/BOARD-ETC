import React from "react";
import Axios from "./Axios";
import { useNavigate } from "react-router-dom";

const useLogOut = () => {
  const navigate = useNavigate();

  const logoutUser = async () => {
    try {
      const response = await Axios({
        url: "/api/user/logout",
        method: "get",
      });

      if (response.status !== 200) {
        alert(response.data.message);
      } else {
        localStorage.clear();

        navigate("/");
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return { logoutUser };
};

export default useLogOut;
