import React from "react";
import { useSelector } from "react-redux";

const MyPage = () => {
  const user = useSelector((state) => state.user);

  return <div>{user._id}</div>;
};

export default MyPage;
