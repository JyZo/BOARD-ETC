import React from "react";
import Axios from "./Axios";

const fetchUserDetail = async () => {
  try {
    const response = await Axios({
      url: "/api/user/userdetail",
      method: "get",
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export default fetchUserDetail;
